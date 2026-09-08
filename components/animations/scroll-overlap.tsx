"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPinOverlap } from "@/lib/scroll-pin";

interface ScrollOverlapProps {
  hero: ReactNode;
  children: ReactNode;
}

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
