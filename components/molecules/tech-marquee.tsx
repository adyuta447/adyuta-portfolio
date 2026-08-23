import { cn } from "@/lib/utils";
import { describeTechStack, resolveTechMarks } from "@/lib/tech-stack";
import { TechMarkIcon } from "@/components/atoms/tech-mark-icon";
import { TechMarkSprite } from "@/components/atoms/tech-mark-sprite";
import { MarqueeRow } from "./marquee-row";

const BASE_DURATION_SECONDS = 85;

interface TechMarqueeProps {
  groups: string[][];
  className?: string;
}

export function TechMarquee({ groups, className }: TechMarqueeProps) {
  const rows = resolveTechMarks(groups);
  if (rows.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <TechMarkSprite marks={rows.flat()} />

      {rows.map((marks, index) => (
        <MarqueeRow
          key={index}
          reverse={index % 2 === 1}
          durationSeconds={BASE_DURATION_SECONDS + index * 10}
          items={marks.map((mark) => (
            <TechMarkIcon
              key={mark.id}
              mark={mark}
              className="mr-12 sm:mr-20"
            />
          ))}
        />
      ))}

      <span className="sr-only">{describeTechStack(groups)}</span>
    </div>
  );
}
