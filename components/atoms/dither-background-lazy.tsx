"use client";

import dynamic from "next/dynamic";

/**
 * The WebGL dither renderer (shader compile + GL setup) has no business in the
 * hydration critical path — it is a background effect. This wrapper keeps the
 * import client-side and out of the initial bundle; the hero renders and
 * hydrates without it, then the canvas mounts on idle.
 */
export const DitherBackground = dynamic(
  () => import("./dither-background").then((m) => m.DitherBackground),
  { ssr: false },
);
