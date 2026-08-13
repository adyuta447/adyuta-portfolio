"use client";

import type { LucideIcon } from "lucide-react";
import { Trophy, Medal, Award, Flag } from "lucide-react";
import HonorsAwardsItem, { type HonorAward } from "@/app/data/honors-awards";
import Head from "../atoms/head";

type Tier = "winner" | "runnerUp" | "finalist" | "participant";

// The placement is stated in the title, so it's the only place to read the
// tier from. Falls back to "participant", which is the safe default: a new
// entry still renders, just without podium emphasis.
function tierOf(title: string): Tier {
  const t = title.toLowerCase();
  // Runner-up is tested first: "2nd Place Winner of ..." contains a winning
  // phrase too, and would otherwise be promoted to the top tier.
  if (/\b(2nd place|juara 2|runner[- ]up)\b/.test(t)) return "runnerUp";
  if (/\b(1st place|juara 1|grand prize)\b/.test(t)) return "winner";
  if (/(semifinalist|finalist|top \d)/.test(t)) return "finalist";
  return "participant";
}

const tierIcon: Record<Tier, LucideIcon> = {
  winner: Trophy,
  runnerUp: Medal,
  finalist: Award,
  participant: Flag,
};

type RankedAward = HonorAward & { tier: Tier };

const ranked: RankedAward[] = HonorsAwardsItem.map((item) => ({
  ...item,
  tier: tierOf(item.title),
}));

const podium = ranked.filter(
  (item) => item.tier === "winner" || item.tier === "runnerUp",
);
const rest = ranked.filter(
  (item) => item.tier !== "winner" && item.tier !== "runnerUp",
);

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
          description="Competition placements across business, hackathon, and olympiad circuits."
        />

        {podium.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {podium.map((item, index) => {
              const Icon = tierIcon[item.tier];

              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/25 bg-card/40 glass backdrop-blur-sm p-6 sm:p-8 transition-colors duration-300 hover:border-primary/60 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 120 + 200}ms` }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between gap-4">
                    <Icon
                      aria-hidden
                      className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-balance transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-auto pt-6 text-sm text-muted-foreground">
                    {item.issuer}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card/40 glass backdrop-blur-sm lg:mt-6">
            <div className="divide-y divide-border/30">
              {rest.map((item, index) => {
                const Icon = tierIcon[item.tier];

                return (
                  <article
                    key={item.id}
                    className="group relative grid grid-cols-[1.25rem_1fr] items-baseline gap-x-4 gap-y-1 px-5 py-5 transition-colors duration-300 hover:bg-secondary/30 sm:grid-cols-[1.25rem_1fr_auto] sm:gap-x-6 sm:px-8 sm:py-6 animate-fade-in"
                    style={{ animationDelay: `${index * 60 + 400}ms` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Icon
                      aria-hidden
                      className="h-4 w-4 translate-y-0.5 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                    />

                    <h3 className="text-base font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>

                    <p className="col-start-2 text-sm text-muted-foreground sm:row-start-2">
                      {item.issuer}
                    </p>

                    <span className="col-start-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:col-start-3 sm:row-start-1 sm:text-right">
                      {item.date}
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
