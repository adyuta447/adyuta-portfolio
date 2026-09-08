import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buildMarqueeTrack } from "@/lib/marquee";

interface MarqueeRowProps {
  items: ReactNode[];
  reverse?: boolean;
  durationSeconds: number;
  className?: string;
}

export function MarqueeRow({
  items,
  reverse = false,
  durationSeconds,
  className,
}: MarqueeRowProps) {
  const track = buildMarqueeTrack(items);
  if (track.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
      >
        {track.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </div>
    </div>
  );
}
