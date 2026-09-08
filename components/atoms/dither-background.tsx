"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { supportsWebGL2 } from "@/lib/webgl-support";
import { subscribeScrollActivity } from "@/lib/scroll-activity";
import {
  createDitherRenderer,
  type DitherOptions,
  type DitherRenderer,
} from "@/lib/dither-renderer";

const THEME_COLOR = {
  dark: [1, 1, 1],
  light: [0, 0, 0],
} as const;

const PROFILE = {
  desktop: {
    pixelSize: 10,
    contrast: 4.0,
    maxPixelRatio: 1.5,
    maxFps: 40,
    opacity: { dark: 0.62, light: 0.55 },
  },
  mobile: {
    pixelSize: 6,
    contrast: 3.0,
    maxPixelRatio: 1.25,
    maxFps: 30,
    opacity: { dark: 0.5, light: 0.42 },
  },
} as const;

const MOBILE_QUERY = "(max-width: 640px)";

interface DitherBackgroundProps {
  waveSpeed?: number;
  /** Bands across the field. */
  waveFrequency?: number;
  /** How hard the noise bends the bands. */
  waveAmplitude?: number;
  /** Linear RGB, 0–1. Defaults to white on dark, black on light. */
  waveColor?: readonly [number, number, number];
  colorNum?: number;
  /** Halftone grid pitch in CSS pixels. */
  pixelSize?: number;
  mouseRadius?: number;
  /** Defaults per theme; light needs less to read as strongly. */
  opacity?: number;
  contrast?: number;
  /** Band direction in radians, measured from horizontal. */
  angle?: number;
  /** Elongation along the band; 1 is isotropic blobs. */
  stretch?: number;
  enableMouseInteraction?: boolean;
  disableAnimation?: boolean;
  className?: string;
}

export function DitherBackground({
  waveSpeed = 0.04,
  waveFrequency = 2.5,
  waveAmplitude = 0.5,
  waveColor,
  colorNum = 5,
  pixelSize,
  mouseRadius = 0.35,
  opacity,
  contrast,
  angle = 0.55,
  stretch = 8,
  enableMouseInteraction = true,
  disableAnimation = false,
  className,
}: DitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<DitherRenderer | null>(null);
  const { resolvedTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const isLight = resolvedTheme === "light";
  const profile = isMobile ? PROFILE.mobile : PROFILE.desktop;

  const [red, green, blue] =
    waveColor ?? (isLight ? THEME_COLOR.light : THEME_COLOR.dark);
  const alpha =
    opacity ?? (isLight ? profile.opacity.light : profile.opacity.dark);
  const grid = pixelSize ?? profile.pixelSize;
  const curve = contrast ?? profile.contrast;

  const maxFpsRef = useRef(profile.maxFps);

  const optionsRef = useRef<DitherOptions>({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor: [red, green, blue],
    colorNum,
    pixelSize: grid,
    mouseRadius,
    opacity: alpha,
    contrast: curve,
    angle,
    stretch,
    maxPixelRatio: profile.maxPixelRatio,
  });

  // Props and theme feed the running renderer instead of recreating it, so a
  // theme switch does not tear down the GL context mid-animation.
  useEffect(() => {
    const next: DitherOptions = {
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      waveColor: [red, green, blue],
      colorNum,
      pixelSize: grid,
      mouseRadius,
      opacity: alpha,
      contrast: curve,
      angle,
      stretch,
      maxPixelRatio: profile.maxPixelRatio,
    };

    optionsRef.current = next;
    maxFpsRef.current = profile.maxFps;
    rendererRef.current?.setOptions(next);

    // Grid pitch and pixel ratio are baked into the canvas size, so a profile
    // change has to re-run the resize to take effect.
    const canvas = canvasRef.current;
    if (canvas) {
      rendererRef.current?.resize(canvas.clientWidth, canvas.clientHeight);
    }
  }, [
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    red,
    green,
    blue,
    colorNum,
    grid,
    mouseRadius,
    alpha,
    curve,
    angle,
    stretch,
    profile.maxPixelRatio,
    profile.maxFps,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isStatic = disableAnimation || prefersReducedMotion;
    const tracksPointer =
      enableMouseInteraction && window.matchMedia("(pointer: fine)").matches;

    let renderer: DitherRenderer | null = null;
    let frame = 0;
    let elapsed = 0;
    let lastFrameTime = 0;
    let running = false;
    let onScreen = false;
    let scrolling = false;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);

      const delta = now - lastFrameTime;
      if (delta < 1000 / maxFpsRef.current) return;

      elapsed += delta / 1000;
      lastFrameTime = now;
      renderer?.render(elapsed);
    };

    // Off-screen, backgrounded, or mid-scroll all cost nothing: the loop is
    // stopped, not throttled, and picks up where it left off so the wave never
    // jumps.
    //
    // Scrolling matters most. Once the hero is pinned it stays on screen for the
    // whole overlap, and every glass card riding over it has to re-blur its
    // backdrop each time this canvas repaints. Holding the last frame for the
    // duration of a scroll removes that work entirely, and nobody looks at a
    // slow background while the page is moving.
    const resume = () => {
      if (running || isStatic || !onScreen || scrolling || document.hidden) {
        return;
      }
      running = true;
      lastFrameTime = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const pause = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const setup = () => {
      if (!supportsWebGL2()) return false;

      renderer = createDitherRenderer(canvas, optionsRef.current);
      if (!renderer) return false;

      rendererRef.current = renderer;
      renderer.resize(canvas.clientWidth, canvas.clientHeight);
      renderer.render(elapsed);
      return true;
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      pause();
      renderer?.dispose();
      renderer = null;
      rendererRef.current = null;
    };

    const handleContextRestored = () => {
      if (setup()) resume();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      // The GL origin is bottom left; the DOM's is top left.
      const y = 1 - (event.clientY - rect.top) / rect.height;

      renderer?.setPointer(x < 0 || x > 1 || y < 0 || y > 1 ? null : { x, y });
    };

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      renderer?.resize(width, height);
      if (!running) renderer?.render(elapsed);
    });
    observer.observe(canvas);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) resume();
        else pause();
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) pause();
      else resume();
    };

    const unsubscribeScroll = subscribeScrollActivity((isScrolling) => {
      scrolling = isScrolling;
      if (isScrolling) pause();
      else resume();
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    if (tracksPointer) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    // Last, so a context that fails or arrives lost can still be recovered by
    // the restore listener above instead of leaving a dead canvas.
    setup();

    return () => {
      pause();
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      window.removeEventListener("pointermove", handlePointerMove);
      unsubscribeScroll();
      renderer?.dispose();
      rendererRef.current = null;
    };
  }, [disableAnimation, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
