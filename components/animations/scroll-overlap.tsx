"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPinOverlap } from "@/lib/scroll-pin";

interface ScrollOverlapProps {
  /** Held in place while the page scrolls past it. */
  hero: ReactNode;
  /** Everything after the hero; slides up and covers it. */
  children: ReactNode;
}

/**
 * Markup and lifecycle only — the scroll behaviour itself lives in
 * lib/scroll-pin, which touches nothing but the two elements handed to it.
 */
export function ScrollOverlap({ hero, children }: ScrollOverlapProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pinned = pinRef.current;
    const veil = veilRef.current;
    if (!pinned || !veil) return;

    return createPinOverlap({ pinned, veil });
  }, []);

  return (
    <>
      <div ref={pinRef} className="relative">
        {hero}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-background opacity-0"
        />
      </div>

      <div className="relative z-20 rounded-t-4xl border-t border-border/40 bg-background sm:rounded-t-[50px]">
        {children}
      </div>
    </>
  );
}
