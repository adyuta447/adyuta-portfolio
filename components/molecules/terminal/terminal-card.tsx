import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import TerminalCardHeader from "./terminal-header";

interface TerminalCardProps {
  children: ReactNode;
  path: string;
  statusIcon?: ReactNode;
  statusText?: string;
  className?: string;
}

export function TerminalCard({
  children,
  path,
  statusIcon,
  statusText,
  className,
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2",
        className,
      )}
    >
      <TerminalCardHeader
        path={path}
        statusIcon={statusIcon}
        statusText={statusText}
      />
      {children}
    </div>
  );
}
