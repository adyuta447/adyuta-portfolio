import { ReactNode } from "react";

interface TerminalCardHeaderProps {
  path: string;
  statusIcon?: ReactNode;
  statusText?: string;
}

export default function TerminalHeader({
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
