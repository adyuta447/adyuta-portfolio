import { cn } from "@/lib/utils";
import { getProvider } from "@/app/data/cert-providers";

interface ProviderLogoProps {
  nameCompany: string;
  className?: string;
}

/**
 * Brand plate for a certification provider, sized by its container. Decorative
 * by design — every call site pairs it with the provider name as text or as an
 * accessible label. Returns null when the provider has no artwork.
 */
export function ProviderLogo({ nameCompany, className }: ProviderLogoProps) {
  const provider = getProvider(nameCompany);
  if (!provider.logo) return null;

  return (
    <span
      className={cn(
        "block aspect-2/1 w-full overflow-hidden rounded-md",
        !provider.bleed && "bg-white",
        className,
      )}
    >
      <img
        src={provider.logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full",
          provider.bleed ? "object-cover" : "object-contain p-2.5",
        )}
      />
    </span>
  );
}
