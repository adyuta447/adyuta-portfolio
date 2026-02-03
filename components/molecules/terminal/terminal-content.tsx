import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalCardContentProps {
  children: ReactNode;
  className?: string;
}

export function TerminalCardContent({
  children,
  className,
}: TerminalCardContentProps) {
  return (
    <div className={cn("divide-y divide-border/30", className)}>{children}</div>
  );
}
