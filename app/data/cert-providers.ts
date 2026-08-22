export interface CertProvider {
  /** Short name for chips, tooltips and screen readers. */
  label: string;
  /** Path under /public. Providers without artwork fall back to the label. */
  logo?: string;
  /**
   * Set when the artwork ships with its own baked background: it then fills the
   * plate edge to edge and becomes the tile itself. Transparent or white-matted
   * logos leave this off and sit on a white plate with padding, otherwise their
   * dark lettering disappears in dark mode.
   */
  bleed?: boolean;
}

/** Keyed by `Certification["nameCompany"]`. */
const providers: Record<string, CertProvider> = {
  "Dicoding Indonesia": {
    label: "Dicoding",
    logo: "/cert-logos/dicoding.avif",
    bleed: true,
  },
  Progate: {
    label: "Progate",
    logo: "/cert-logos/progate.png",
  },
  Cybrary: {
    label: "Cybrary",
    logo: "/cert-logos/cybrary.jpg",
    bleed: true,
  },
  freeCodeCamp: {
    label: "freeCodeCamp",
    logo: "/cert-logos/freecodecamp.png",
    bleed: true,
  },
  Microsoft: {
    label: "Microsoft",
    logo: "/cert-logos/microsoft.jpeg",
  },
  Hackerrank: {
    label: "HackerRank",
    logo: "/cert-logos/hackerrank.png",
  },
  Codecademy: {
    label: "Codecademy",
    logo: "/cert-logos/codecademy.webp",
    bleed: true,
  },
  "Skilvul Indonesia": {
    label: "Skilvul",
    logo: "/cert-logos/skilvul.webp",
    bleed: true,
  },
  CODEPOLITAN: {
    label: "Codepolitan",
    logo: "/cert-logos/codepolitan.jpg",
    bleed: true,
  },
  Cisco: { label: "Cisco" },
};

/** Falls back to the raw company name so new data renders without a registry entry. */
export function getProvider(nameCompany: string): CertProvider {
  return providers[nameCompany] ?? { label: nameCompany };
}

export default providers;
