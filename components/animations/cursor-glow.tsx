"use client";

import { useEffect, useRef } from "react";

/**
 * A pointer-following glow. Written against refs, not state: the cursor moves
 * every frame and a `setState` there re-runs React on each one. Here the two
 * layers are positioned with a direct `transform` write inside a single rAF,
 * and nothing mounts at all off the desktop.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    if (!fine.matches) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let shown = false;

    const paint = () => {
      raf = 0;
      const t = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      glow.style.transform = t;
      dot.style.transform = t;
      if (!shown) {
        shown = true;
        glow.style.opacity = "1";
        dot.style.opacity = "0.15";
      }
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      shown = false;
      glow.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select',
      );
      const size = interactive ? "500px" : "400px";
      glow.style.width = size;
      glow.style.height = size;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow hidden lg:block pointer-events-none"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          width: "400px",
          height: "400px",
          transition: "opacity 0.4s ease, width 0.3s ease, height 0.3s ease",
        }}
      />
      <div
        ref={dotRef}
        className="hidden lg:block pointer-events-none fixed left-0 top-0 w-8 h-8 rounded-full mix-blend-screen"
        style={{
          opacity: 0,
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          transition: "opacity 0.2s ease",
          filter: "blur(4px)",
        }}
      />
    </>
  );
}
