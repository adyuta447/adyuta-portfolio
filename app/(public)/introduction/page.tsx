import { Code2, Layers, FileText, Zap, Bot, Globe } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                Hi my name is
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Jan Agra Adyuta Harnowo
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              Co-founder & Lead Engineer at Arkakode, a digital agency crafting
              meaningful digital experiences. I specialize in building fast,
              reliable, and modern web applications with a focus on scalability
              and user experience. Proficient in React.js, Next.js, TypeScript,
              and the full stack, I transform ideas into production-ready
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                About Adyuta
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Full-Stack Builder & Digital Innovator
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                This portfolio is a showcase of my journey as a developer and
                entrepreneur. It reflects my passion for building impactful
                digital solutions, from commercial projects at Arkakode to
                open-source contributions and experimental prototypes.
              </p>

              <p>
                I believe in the power of clean code, thoughtful design, and
                continuous innovation. Whether it&apos;s developing a gaming
                top-up platform, disaster management systems, or e-commerce
                solutions, I approach every project with the goal of delivering
                real value to users.
              </p>

              <p>
                This space documents my technical experiments, lab notes, and
                real-world projects. It&apos;s a window into my creative
                process, problem-solving approach, and commitment to building
                the future of the web.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
