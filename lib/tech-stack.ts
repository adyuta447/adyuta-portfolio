import techLogos, { type TechLogo } from "@/app/data/tech-logos";

export interface TechMark extends TechLogo {
  label: string;
}

export function techMarkId(id: string): string {
  return `tech-${id}`;
}

export function resolveTechMarks(groups: string[][]): TechMark[][] {
  const claimed = new Set<string>();

  return groups
    .map((labels) => {
      const marks: TechMark[] = [];

      for (const label of labels) {
        const logo = techLogos[label];
        if (!logo || claimed.has(logo.id)) continue;

        claimed.add(logo.id);
        marks.push({ ...logo, label });
      }

      return marks;
    })
    .filter((marks) => marks.length > 0);
}

export function describeTechStack(groups: string[][]): string {
  return groups
    .flat()
    .filter((label) => techLogos[label])
    .join(", ");
}
