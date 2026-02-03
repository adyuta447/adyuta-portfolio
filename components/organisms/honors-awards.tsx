"use client";

import { cn } from "@/lib/utils";
import { Trophy, Award, ExternalLink, Star } from "lucide-react";
import HonorsAwardsItem, { HonorAward } from "@/app/data/honors-awards";
import Head from "../atoms/head";
import TerminalHeader from "../molecules/terminal/terminal-header";

export default function HonorsAwards() {
  return (
    <section
      id="honors-awards"
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Recognition"
          title="Honors & Awards"
          description="Recognition and achievements earned through dedication, innovation, and excellence in various competitions and programs."
        />

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          <TerminalHeader
            path="~/adyuta/achievements"
            statusIcon={<Trophy className="w-3.5 h-3.5 text-yellow-500" />}
            statusText={`${HonorsAwardsItem.length} awards`}
          />

          {/* Awards List */}
          <div className="divide-y divide-border/30">
            {HonorsAwardsItem.map((item, index) => {
              const content = (
                <div
                  key={item.id}
                  className={cn(
                    "group relative p-5 sm:p-6 transition-all duration-300 hover:bg-secondary/30 animate-fade-in",
                    item.url && "cursor-pointer",
                  )}
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  {/* Highlight indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500/50 via-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-3 min-w-0">
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-yellow-500 font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                          <Award className="h-4 w-4" />
                        </span>
                        <h4 className="font-mono text-sm sm:text-base font-medium tracking-tight transition-colors group-hover:text-primary">
                          {item.title}
                        </h4>
                        {item.url && (
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>

                      {/* Issuer & Description */}
                      <div className="pl-5 sm:pl-7 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm text-foreground/90">
                            {item.issuer}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="rounded-full border border-yellow-500/40 bg-yellow-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-yellow-500">
                            {item.date}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Star indicator */}
                    <div className="hidden sm:flex items-center gap-1 text-yellow-500/60 group-hover:text-yellow-500 transition-colors">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              );

              if (item.url) {
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return content;
            })}
          </div>

          {/* Terminal Footer */}
          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">
                cat achievements.log
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
