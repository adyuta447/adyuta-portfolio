import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
  path: string;
  statusIcon?: ReactNode;
  statusText?: string;
  className?: string;
}

interface TerminalCardHeaderProps {
  path: string;
  statusIcon?: ReactNode;
  statusText?: string;
}

function TerminalCardHeader({
  path,
  statusIcon,
  statusText,
}: TerminalCardHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
        <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
      </div>
      <span className="ml-4 font-mono text-xs text-muted-foreground truncate">
        {path}
      </span>
      {(statusIcon || statusText) && (
        <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
          {statusIcon}
          {statusText && (
            <span className="font-mono text-xs">{statusText}</span>
          )}
        </div>
      )}
    </div>
  );
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
