import { cn } from "@/lib/utils";
import Image from "next/image";

interface IllustrationProps {
  src: string;
  className?: string;
}

export function Illustration({ src, className }: IllustrationProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={400}
      height={400}
      className={cn("block h-auto w-full", className)}
    />
  );
}
