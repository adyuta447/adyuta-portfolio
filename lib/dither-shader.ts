/**
 * GLSL for the hero's dithered wave field, drawn in two passes.
 *
 * Pass one evaluates the noise into a texture holding one texel per halftone
 * cell — a few hundred texels wide, so the expensive part runs on a fraction of
 * the fragments. Pass two reads that texture and draws the actual dots at full
 * resolution, which costs one fetch and a distance test per fragment.
 *
 * Splitting it this way is what keeps crisp, retina-sharp dots affordable: a
 * single pass would evaluate four octaves of simplex noise for every device
 * pixel instead of once per dot.
 */

/**
 * Fullscreen triangle generated from gl_VertexID: no vertex buffer, no
 * attributes, one draw call of three vertices. Shared by both passes.
 */
export const VERTEX_SHADER = /* glsl */ `#version 300 es
void main() {
  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}
`;

/**
 * Pass one: the wave field, one texel per dot.
 *
 * highp is required, not stylistic: the permutation step of the noise reaches
 * ~83k, well past what mediump can represent on mobile GPUs, and the field
 * collapses into banding there.
 */
export const FIELD_FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uPointerRadius;
uniform float uWaveSpeed;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
uniform float uContrast;
uniform float uAngle;
uniform float uStretch;

out vec4 fragColor;

// 2D simplex noise — Ashima Arts / Stefan Gustavson, MIT licensed.
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 position = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  float sinAngle = sin(uAngle);
  float cosAngle = cos(uAngle);
  float along =
    (position.x * cosAngle + position.y * sinAngle) / max(uStretch, 0.001);
  float across = -position.x * sinAngle + position.y * cosAngle;

  float drift = uTime * uWaveSpeed;
  float wobble = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;

  for (int octave = 0; octave < 3; octave++) {
    wobble +=
      amplitude * snoise(vec2((along + drift) * frequency, across * frequency));
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  // A directional wave rather than raw noise. Plain fbm blobs evenly in every
  // direction, which is what made the field spread across the whole hero; the
  // sine gives it continuous bands running along uAngle, and the noise only
  // bends them so they drift instead of looking ruled.
  float bands =
    sin((across + wobble * uWaveAmplitude) * uWaveFrequency * 3.14159265);
  float value = 0.5 + 0.5 * bands;

  float distanceToPointer = distance(position, uPointer);
  float radius = max(uPointerRadius, 0.001);
  float falloff =
    exp(-(distanceToPointer * distanceToPointer) / (radius * radius));
  value += uPointerStrength * falloff * 0.5;

  value = clamp(value, 0.0, 1.0);
  fragColor = vec4(pow(value, uContrast), 0.0, 0.0, 1.0);
}
`;

/** Pass two: one antialiased dot per cell, sized by the dithered field value. */
export const DOT_FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uField;
uniform float uPitch;
uniform float uColorNum;
uniform float uDotScale;
uniform vec3 uWaveColor;
uniform float uOpacity;

out vec4 fragColor;

// 4x4 ordered Bayer matrix: the halftone grid the field is quantised against.
const float BAYER[16] = float[16](
  0.0, 8.0, 2.0, 10.0,
  12.0, 4.0, 14.0, 6.0,
  3.0, 11.0, 1.0, 9.0,
  15.0, 7.0, 13.0, 5.0
);

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPitch);
  vec2 center = (cell + 0.5) * uPitch;

  float value = texelFetch(uField, ivec2(cell), 0).r;

  ivec2 tile = ivec2(mod(cell, 4.0));
  float threshold = (BAYER[tile.y * 4 + tile.x] + 0.5) / 16.0;
  float levels = max(uColorNum - 1.0, 1.0);
  float quantized = clamp(floor(value * levels + threshold) / levels, 0.0, 1.0);

  // Area, not radius, tracks the value — that is what makes a halftone read as
  // an even ramp instead of bunching all of its contrast at the small end.
  float radius = uDotScale * uPitch * 0.5 * sqrt(quantized);
  float distanceToCenter = distance(gl_FragCoord.xy, center);
  float coverage = 1.0 - smoothstep(radius - 1.0, radius + 0.5, distanceToCenter);

  fragColor = vec4(uWaveColor, coverage * uOpacity);
}
`;
