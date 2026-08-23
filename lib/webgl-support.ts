let cached: boolean | null = null;

/**
 * Whether this browser can run the hero's background at all.
 *
 * Probed on a throwaway canvas and remembered for the session, so the answer is
 * the same for the renderer and for the notice that explains its absence. The
 * probe context is released immediately — contexts are a limited resource, and
 * this one is never drawn to.
 */
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
