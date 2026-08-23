"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Illustration } from "@/components/atoms/illustration";
import { supportsWebGL2 } from "@/lib/webgl-support";

export function WebglNotice() {
  const [unsupported, setUnsupported] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setUnsupported(!supportsWebGL2());
  }, []);

  if (!unsupported || dismissed) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background px-4 py-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md sm:border"
    >
      <div className="mx-auto flex max-w-2xl items-start gap-4 sm:max-w-none">
        <Illustration src="/warning.svg" className="w-20 shrink-0 sm:w-28" />

        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Limited browser support
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This browser has no WebGL2, so the animated hero background stays
            off. Everything else on the site works normally.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notice"
          className="shrink-0 p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
