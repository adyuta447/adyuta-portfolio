"use client";

import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import EducationItem from "@/app/data/education";
import Head from "../atoms/head";

const CURRENT_YEAR = new Date().getFullYear();

const sortedEducation = [...EducationItem].sort(
  (a, b) => parseInt(b.startDate, 10) - parseInt(a.startDate, 10),
);

export default function Education() {
  return (
    <section
      id="education"
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Background"
          title="Education"
          description="Where the formal training happened, from science-track high school to an informatics degree."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {sortedEducation.map((item, index) => {
            const isOngoing = parseInt(item.endDate, 10) > CURRENT_YEAR;

            return (
              <div
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass backdrop-blur-sm p-5 sm:p-6 transition-colors duration-300 hover-lift animate-fade-in",
                  isOngoing ? "hover:border-primary/50" : "hover:border-border",
                )}
                style={{ animationDelay: `${index * 120 + 200}ms` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {item.startDate} — {item.endDate}
                  </span>
                  {isOngoing ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Ongoing
                      </span>
                    </span>
                  ) : (
                    <span className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Graduated
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {item.school}
                </h3>

                <p className="mt-1.5 text-sm text-foreground/80">
                  {item.degree}
                </p>

                <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
