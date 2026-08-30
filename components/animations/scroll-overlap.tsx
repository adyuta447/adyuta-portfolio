"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollOverlapProps {
  /** Held in place while the page scrolls past it. */
  hero: ReactNode;
  /** Everything after the hero; slides up and covers it. */
  children: ReactNode;
}

/**
 * Pins the hero and lets the rest of the page ride over it.
 *
 * `pinSpacing: false` is what creates the overlap: the pin reserves no room in
 * the flow, so the content below keeps its position and travels up across the
 * held hero instead of waiting for it. The content needs its own opaque surface
 * for that — without one the hero would read straight through it, and that
 * surface is also what carries the rounded top edge, so the sheet reads as one
 * panel lifting over the hero rather than a section with cut corners.
 */
export function ScrollOverlap({ hero, children }: ScrollOverlapProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pinned = pinRef.current;
    const fading = fadeRef.current;
    if (!pinned || !fading) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const range = { start: "top top", end: "bottom top" };

      ScrollTrigger.create({
        trigger: pinned,
        ...range,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Applied to an inner element, never the pinned one: on touch devices the
      // pin itself is driven by a transform, and a second transform on the same
      // node fights it.
      gsap.to(fading, {
        opacity: 0.2,
        scale: 0.97,
        ease: "none",
        scrollTrigger: { trigger: pinned, ...range, scrub: 0.4 },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <div ref={pinRef}>
        <div ref={fadeRef}>{hero}</div>
      </div>

      <div className="relative z-20 rounded-t-4xl border-t border-border/40 bg-background sm:rounded-t-[50px]">
        {children}
      </div>
    </>
  );
}
