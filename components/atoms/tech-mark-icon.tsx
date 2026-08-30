import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { techMarkId, type TechMark } from "@/lib/tech-stack";

interface TechMarkIconProps
  extends Pick<TechMark, "id" | "label" | "hex" | "darkHex"> {
  className?: string;
}

/**
 * Server component. The hover-to-brand-colour used to need `useState` +
 * `useTheme` per icon — ~100 hydrating components for one marquee. The brand
 * colours are handed to CSS as custom properties instead and `.tech-mark`
 * rules in globals.css do the theme-aware swap on `:hover`, so this ships no JS.
 */
export function TechMarkIcon({
  id,
  label,
  hex,
  darkHex,
  className,
}: TechMarkIconProps) {
  return (
    <span
      title={label}
      className={cn("tech-mark shrink-0", className)}
      style={
        {
          "--tm-brand": hex,
          "--tm-brand-dark": darkHex ?? hex,
        } as CSSProperties
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 fill-current transition-colors duration-200 sm:h-14 sm:w-14"
      >
        <use href={`#${techMarkId(id)}`} />
      </svg>
    </span>
  );
}
