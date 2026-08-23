"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { techMarkId, type TechMark } from "@/lib/tech-stack";

interface TechMarkIconProps extends Pick<
  TechMark,
  "id" | "label" | "hex" | "darkHex"
> {
  className?: string;
}

export function TechMarkIcon({
  id,
  label,
  hex,
  darkHex,
  className,
}: TechMarkIconProps) {
  const [isActive, setIsActive] = useState(false);
  const { resolvedTheme } = useTheme();

  const brandColor = resolvedTheme === "dark" ? (darkHex ?? hex) : hex;

  return (
    <span
      title={label}
      className={cn("shrink-0", className)}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
    >
      <svg
        viewBox="0 0 24 24"
        style={isActive ? { color: brandColor } : undefined}
        className={cn(
          "h-10 w-10 fill-current transition-colors duration-200 sm:h-14 sm:w-14",
          !isActive && "text-muted-foreground",
        )}
      >
        <use href={`#${techMarkId(id)}`} />
      </svg>
    </span>
  );
}
