import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface PinOverlapTargets {
  /** Held in place while the page scrolls past it. */
  pinned: HTMLElement;
  /** Opaque sheet over the pinned element, faded in as it gets covered. */
  veil: HTMLElement;
}

/** How far the veil closes over the pinned element by the end of the scroll. */
const VEIL_OPACITY = 0.8;

let configured = false;

/**
 * Pins an element and lets the page ride over it.
 *
 * `pinSpacing: false` is what creates the overlap: the pin reserves no room in
 * the flow, so the content below keeps its position and travels up across the
 * held element instead of waiting for it.
 *
 * The recede is a veil rather than a tween on the pinned element itself. Fading
 * or scaling the element would repaint everything inside it on every scroll
 * frame — including the hero's canvas — while animating a separate solid sheet
 * is a compositor-only job that never touches what is underneath.
 *
 * Returns a cleanup that reverts every trigger and tween it created.
 */
export function createPinOverlap({ pinned, veil }: PinOverlapTargets): () => void {
  gsap.registerPlugin(ScrollTrigger);

  if (!configured) {
    configured = true;
    ScrollTrigger.config({
      // Mobile browsers fire resize as the URL bar slides away; recalculating
      // there makes the pin jump mid-scroll.
      ignoreMobileResize: true,
    });
  }

  const range = { start: "top top", end: "bottom top" } as const;

  const context = gsap.context(() => {
    ScrollTrigger.create({
      trigger: pinned,
      ...range,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      // A flick that outruns the scrub snaps the pin to its end state rather
      // than easing there behind the content that has already covered it.
      fastScrollEnd: true,
    });

    gsap.to(veil, {
      opacity: VEIL_OPACITY,
      ease: "none",
      scrollTrigger: { trigger: pinned, ...range, scrub: 0.4 },
    });
  });

  return () => context.revert();
}
