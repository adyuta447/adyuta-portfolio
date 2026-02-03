import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function TerminalCardFooter({
  children,
  className,
}: TerminalCardFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
