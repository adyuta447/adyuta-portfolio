import { cn } from "@/lib/utils";

interface IllustrationProps {
  src: string;
  className?: string;
}

export function Illustration({ src, className }: IllustrationProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={cn("block h-auto w-full", className)}
    />
  );
}
