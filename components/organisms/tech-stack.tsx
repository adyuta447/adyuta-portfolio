import skills from "@/app/data/skills";
import { TechMarquee } from "../molecules/tech-marquee";

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="border-b border-border/30 py-10 sm:py-14"
    >
      <div className="mx-auto mb-7 max-w-7xl px-4 sm:mb-9 sm:px-6">
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:tracking-[0.35em]">
          Tech Stack
        </p>
      </div>
      <TechMarquee
        groups={[
          [
            ...skills.webTechnologies,
            ...skills.mlDataScience,
            ...skills.appTechnologies,
          ],
        ]}
      />
    </section>
  );
}
