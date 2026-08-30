import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface PinOverlapTargets {
  pinned: HTMLElement;
  veil: HTMLElement;
}

const VEIL_OPACITY = 0.8;

let configured = false;
export function createPinOverlap({ pinned, veil }: PinOverlapTargets): () => void {
  gsap.registerPlugin(ScrollTrigger);

  if (!configured) {
    configured = true;
    ScrollTrigger.config({
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
