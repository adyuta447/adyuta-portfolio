let cached: boolean | null = null;

export function supportsWebGL2(): boolean {
  if (typeof document === "undefined") return false;
  if (cached !== null) return cached;

  try {
    const context = document.createElement("canvas").getContext("webgl2");
    cached = context !== null;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = false;
  }

  return cached;
}
