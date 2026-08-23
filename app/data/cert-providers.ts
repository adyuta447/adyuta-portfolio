export interface CertProvider {
  label: string;
  logo?: string;
  bleed?: boolean;
}

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
  Cisco: {
    label: "Cisco",
    logo: "/cert-logos/cisco.png",
  },
};

export function getProvider(nameCompany: string): CertProvider {
  return providers[nameCompany] ?? { label: nameCompany };
}

export default providers;
