"use client";

import { cn } from "@/lib/utils";
import { getProvider } from "@/app/data/cert-providers";
import { ProviderLogo } from "./provider-logo";

export interface ProviderCount {
  nameCompany: string;
  count: number;
}

interface ProviderFilterProps {
  providers: ProviderCount[];
  total: number;
  active: string | null;
  onChange: (nameCompany: string | null) => void;
  className?: string;
}

const tileClass = (isActive: boolean) =>
  cn(
    "flex flex-col gap-1.5 rounded-lg border p-1.5 transition-colors duration-200",
    isActive
      ? "border-primary/60 bg-primary/10"
      : "border-border/60 bg-secondary/20 hover:border-foreground/30 hover:bg-secondary/50",
  );

/** Stand-in plate for providers that ship no artwork — same footprint as a logo. */
const FallbackPlate = ({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) => (
  <span
    className={cn(
      "flex aspect-2/1 w-full items-center justify-center rounded-md px-2 text-center font-mono text-xs leading-tight break-words",
      isActive
        ? "bg-primary/15 text-primary"
        : "bg-secondary/60 text-muted-foreground",
    )}
  >
    {label}
  </span>
);

export function ProviderFilter({
  providers,
  total,
  active,
  onChange,
  className,
}: ProviderFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter certifications by provider"
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={active === null}
        className={tileClass(active === null)}
      >
        <FallbackPlate label="All" isActive={active === null} />
        <span
          className={cn(
            "text-center font-mono text-[11px] tabular-nums",
            active === null ? "text-primary" : "text-muted-foreground",
          )}
        >
          {total}
        </span>
      </button>

      {providers.map(({ nameCompany, count }) => {
        const provider = getProvider(nameCompany);
        const isActive = active === nameCompany;

        return (
          <button
            key={nameCompany}
            type="button"
            title={provider.label}
            onClick={() => onChange(isActive ? null : nameCompany)}
            aria-pressed={isActive}
            className={tileClass(isActive)}
          >
            {provider.logo ? (
              <>
                <ProviderLogo nameCompany={nameCompany} />
                <span className="sr-only">{provider.label}</span>
              </>
            ) : (
              <FallbackPlate label={provider.label} isActive={isActive} />
            )}
            <span
              className={cn(
                "text-center font-mono text-[11px] tabular-nums",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
