"use client";

import { cn } from "@/lib/utils";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import ExperiencesItem, { Experience } from "@/app/data/experiences";
import Head from "../atoms/head";

const typeColors: Record<Experience["type"], string> = {
  "full-time": "bg-primary/15 text-primary border-primary/40",
  "part-time": "bg-blue-500/15 text-blue-500 border-blue-500/40",
  freelance: "bg-purple-500/15 text-purple-500 border-purple-500/40",
  contract: "bg-orange-500/15 text-orange-500 border-orange-500/40",
  internship: "bg-cyan-500/15 text-cyan-500 border-cyan-500/40",
};

export default function Experiences() {
  return (
    <section
      id="experience"
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Professional Journey"
          title="Experience"
          description="A chronicle of my professional journey, highlighting key roles, responsibilities, and accomplishments across various organizations."
        />

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          {/* Terminal Header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">
              ~/adyuta/experience
            </span>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs">
                {ExperiencesItem.length} positions
              </span>
            </div>
          </div>

          {/* Experience List */}
          <div className="divide-y divide-border/30">
            {ExperiencesItem.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group relative p-5 sm:p-6 transition-all duration-300 hover:bg-secondary/30 animate-fade-in",
                  item.endDate === "Present" && "bg-primary/5",
                )}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                {/* Timeline indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                        $
                      </span>
                      <h4 className="font-mono text-sm sm:text-base font-medium tracking-tight transition-colors group-hover:text-primary">
                        {item.role}
                      </h4>
                      {item.endDate === "Present" && (
                        <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                            Current
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Company & Type */}
                    <div className="flex flex-wrap items-center gap-2 pl-5 sm:pl-6">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5 group/link"
                        >
                          {item.company}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <span className="font-medium text-sm">
                          {item.company}
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          typeColors[item.type],
                        )}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Location & Date */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pl-5 sm:pl-6 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {item.startDate} — {item.endDate}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="pl-5 sm:pl-6 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pl-5 sm:pl-6 pt-1">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/60 bg-secondary/50 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">
                cat experience.json | jq &apos;.[] | .role&apos;
              </span>
              <span className="ml-auto text-primary/50 hidden sm:block">
                press enter to run
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
