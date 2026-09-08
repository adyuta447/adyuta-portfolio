import {
  DOT_FRAGMENT_SHADER,
  FIELD_FRAGMENT_SHADER,
  VERTEX_SHADER,
} from "./dither-shader";

export interface DitherOptions {
  /** Noise drift per second of wall clock. */
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: readonly [number, number, number];
  /** Dot sizes the field is quantised to before dithering. */
  colorNum: number;
  /** Halftone grid pitch in CSS pixels. */
  pixelSize: number;
  mouseRadius: number;
  opacity: number;
  /** Exponent applied to the field; higher empties the troughs. */
  contrast: number;
  /** Band direction in radians, measured from horizontal. */
  angle: number;
  /** How far the field is elongated along the band; 1 keeps it isotropic. */
  stretch: number;
  /** Upper bound on device pixel ratio. Phones cap lower: the dot pass is
   *  fill-rate bound, and a 3x panel triples it for detail nobody sees. */
  maxPixelRatio: number;
}

export interface DitherRenderer {
  resize(cssWidth: number, cssHeight: number): void;
  /** Normalised canvas coordinates with the WebGL origin (bottom left), or null when the pointer left. */
  setPointer(point: { x: number; y: number } | null): void;
  setOptions(next: Partial<DitherOptions>): void;
  render(elapsedSeconds: number): void;
  dispose(): void;
}

const POINTER_EASING = 0.08;

/** Dot diameter at full coverage, as a fraction of the cell. Below 1 so even the
 *  core of a band keeps its grid gaps and stays legible as dots streaming past,
 *  rather than closing up into a solid mass. */
const DOT_SCALE = 0.9;

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Dither shader failed to compile:", gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function link(
  gl: WebGL2RenderingContext,
  fragmentSource: string,
): WebGLProgram | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Dither program failed to link:", gl.getProgramInfoLog(program));
    }
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * Returns null whenever WebGL2 or the shaders are unavailable — every caller
 * treats that as "no background effect" rather than an error, so a driver
 * without WebGL2 simply keeps the plain hero.
 */
export function createDitherRenderer(
  canvas: HTMLCanvasElement,
  initial: DitherOptions,
): DitherRenderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  // A canvas handed back from an earlier mount can still be carrying a lost
  // context. Asking for it back fires webglcontextrestored, which the caller
  // listens for and retries on, instead of leaving a permanently blank canvas.
  if (gl.isContextLost()) {
    gl.getExtension("WEBGL_lose_context")?.restoreContext();
    return null;
  }

  const fieldProgram = link(gl, FIELD_FRAGMENT_SHADER);
  const dotProgram = link(gl, DOT_FRAGMENT_SHADER);
  const fieldTexture = gl.createTexture();
  const framebuffer = gl.createFramebuffer();

  if (!fieldProgram || !dotProgram || !fieldTexture || !framebuffer) {
    return null;
  }

  const locate = (program: WebGLProgram, names: string[]) =>
    Object.fromEntries(
      names.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<string, WebGLUniformLocation | null>;

  const fieldUniforms = locate(fieldProgram, [
    "uResolution",
    "uTime",
    "uPointer",
    "uPointerStrength",
    "uPointerRadius",
    "uWaveSpeed",
    "uWaveFrequency",
    "uWaveAmplitude",
    "uContrast",
    "uAngle",
    "uStretch",
  ]);

  const dotUniforms = locate(dotProgram, [
    "uField",
    "uPitch",
    "uColorNum",
    "uDotScale",
    "uWaveColor",
    "uOpacity",
  ]);

  const options: DitherOptions = { ...initial };

  // The pointer trails its target instead of snapping, so a fast mouse leaves a
  // wake rather than a jump.
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let strength = 0;
  let targetStrength = 0;

  let pitch = 1;
  let columns = 1;
  let rows = 1;
  let aspect = 1;
  let disposed = false;

  gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // R8 is the leanest color-renderable format in WebGL2, but drivers do refuse
  // it; RGBA8 is the universally supported fallback.
  let fieldFormat: { internal: number; format: number } = {
    internal: gl.R8,
    format: gl.RED,
  };

  const allocateField = () => {
    gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      fieldFormat.internal,
      columns,
      rows,
      0,
      fieldFormat.format,
      gl.UNSIGNED_BYTE,
      null,
    );

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      fieldTexture,
      0,
    );

    const complete =
      gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return complete;
  };

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  return {
    resize(cssWidth, cssHeight) {
      if (disposed) return;

      const ratio = Math.min(window.devicePixelRatio || 1, options.maxPixelRatio);
      const width = Math.max(1, Math.round(cssWidth * ratio));
      const height = Math.max(1, Math.round(cssHeight * ratio));
      const nextPitch = Math.max(2, options.pixelSize * ratio);

      if (
        canvas.width === width &&
        canvas.height === height &&
        pitch === nextPitch
      ) {
        return;
      }

      canvas.width = width;
      canvas.height = height;
      pitch = nextPitch;
      columns = Math.max(1, Math.ceil(width / pitch));
      rows = Math.max(1, Math.ceil(height / pitch));
      aspect = columns / rows;

      if (!allocateField()) {
        fieldFormat = { internal: gl.RGBA8, format: gl.RGBA };
        allocateField();
      }
    },

    setPointer(point) {
      if (point === null) {
        targetStrength = 0;
        return;
      }

      targetX = (point.x - 0.5) * aspect;
      targetY = point.y - 0.5;
      targetStrength = 1;
    },

    setOptions(next) {
      Object.assign(options, next);
    },

    render(elapsedSeconds) {
      if (disposed) return;

      pointerX += (targetX - pointerX) * POINTER_EASING;
      pointerY += (targetY - pointerY) * POINTER_EASING;
      strength += (targetStrength - strength) * POINTER_EASING;

      // Pass one — the field, at one texel per dot.
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.viewport(0, 0, columns, rows);
      gl.disable(gl.BLEND);
      gl.useProgram(fieldProgram);
      gl.uniform2f(fieldUniforms.uResolution, columns, rows);
      gl.uniform1f(fieldUniforms.uTime, elapsedSeconds);
      gl.uniform2f(fieldUniforms.uPointer, pointerX, pointerY);
      gl.uniform1f(fieldUniforms.uPointerStrength, strength);
      gl.uniform1f(fieldUniforms.uPointerRadius, options.mouseRadius);
      gl.uniform1f(fieldUniforms.uWaveSpeed, options.waveSpeed);
      gl.uniform1f(fieldUniforms.uWaveFrequency, options.waveFrequency);
      gl.uniform1f(fieldUniforms.uWaveAmplitude, options.waveAmplitude);
      gl.uniform1f(fieldUniforms.uContrast, options.contrast);
      gl.uniform1f(fieldUniforms.uAngle, options.angle);
      gl.uniform1f(fieldUniforms.uStretch, options.stretch);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Pass two — the dots, at full resolution.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.enable(gl.BLEND);
      gl.useProgram(dotProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
      gl.uniform1i(dotUniforms.uField, 0);
      gl.uniform1f(dotUniforms.uPitch, pitch);
      gl.uniform1f(dotUniforms.uColorNum, options.colorNum);
      gl.uniform1f(dotUniforms.uDotScale, DOT_SCALE);
      gl.uniform3f(dotUniforms.uWaveColor, ...options.waveColor);
      gl.uniform1f(dotUniforms.uOpacity, options.opacity);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    dispose() {
      if (disposed) return;
      disposed = true;

      gl.deleteProgram(fieldProgram);
      gl.deleteProgram(dotProgram);
      gl.deleteTexture(fieldTexture);
      gl.deleteFramebuffer(framebuffer);
      // Deliberately not WEBGL_lose_context: React can hand the same <canvas>
      // back on a later mount, and a context torn down that way stays lost
      // until restoreContext(), so the effect would never come back.
    },
  };
}
