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
              Front-end engineer with six years building web products, now
              pushing into machine learning and MLOps. I co-founded CV. Digital
              Awan Nusantara, where I split my time between shipping React and
              Next.js interfaces and getting ML models out of notebooks and into
              production.
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
                Where Front-End Meets Machine Learning
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                My day-to-day work is mostly front-end: React, Next.js, PWAs,
                Tailwind, and Shadcn UI, built on Turbopack. I care about
                performance and architecture as much as how something looks, and
                a background in cybersecurity means I think about data handling
                and attack surface before I ship, not after.
              </p>

              <p>
                Over the past while I&apos;ve been teaching myself the machine
                learning side properly: preprocessing, feature engineering,
                training and evaluating models, then the less glamorous part of
                actually running them, serving through FastAPI or Flask,
                packaging with Docker, tracking experiments in MLflow, and
                keeping an eye on things in production with Prometheus and
                Grafana.
              </p>

              <p>
                At CV. Digital Awan Nusantara I&apos;m not just writing code. I
                handle the financial side, client relationships, and product
                decisions too, which forces me to weigh engineering choices
                against what the business can actually sustain. The direction
                I&apos;m working toward is systems where the ML isn&apos;t a
                bolt-on demo but genuinely part of the product.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
