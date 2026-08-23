import { cn } from "@/lib/utils";
import { techMarkId, type TechMark } from "@/lib/tech-stack";

interface TechMarkIconProps {
  mark: TechMark;
  /** Spacing and layout belong to the caller; the glyph keeps its own size. */
  className?: string;
}

export function TechMarkIcon({ mark, className }: TechMarkIconProps) {
  return (
    <span title={mark.label} className={cn("shrink-0", className)}>
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 fill-current text-muted-foreground transition-colors duration-200 hover:text-foreground sm:h-14 sm:w-14"
      >
        <use href={`#${techMarkId(mark.id)}`} />
      </svg>
    </span>
  );
}
