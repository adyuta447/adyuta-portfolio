"use client";

import { cn } from "@/lib/utils";
import { Users, Calendar } from "lucide-react";
import OrganizationsItem from "@/app/data/organizations";
import Head from "../atoms/head";
import { TerminalCard } from "../molecules/terminal/terminal-card";
import { TerminalCardContent } from "../molecules/terminal/terminal-content";
import { TerminalCardFooter } from "../molecules/terminal/terminal-footer";

export default function OrganizationalExperience() {
  return (
    <section
      id="organizational-experience"
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Involvement"
          title="Organizational Experience"
          description="Committee and organizational roles alongside professional work, from campus events to student associations."
        />

        <TerminalCard
          path="~/adyuta/organizations"
          statusIcon={<Users className="w-3.5 h-3.5 text-primary" />}
          statusText={`${OrganizationsItem.length} roles`}
        >
          <TerminalCardContent>
            {OrganizationsItem.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group relative p-5 sm:p-6 transition-all duration-300 hover:bg-secondary/30 animate-fade-in",
                  item.endDate === "Present" && "bg-primary/5",
                )}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-3 min-w-0">
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

                    <p className="pl-5 sm:pl-6 font-medium text-sm text-foreground/90">
                      {item.organization}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pl-5 sm:pl-6 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {item.startDate} — {item.endDate}
                      </span>
                    </div>

                    {item.description && (
                      <p className="pl-5 sm:pl-6 text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TerminalCardContent>

          <TerminalCardFooter>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">
                cat organizations.json
              </span>
              <span className="ml-auto text-primary/50 hidden sm:block">
                press enter to run
              </span>
            </div>
          </TerminalCardFooter>
        </TerminalCard>
      </div>
    </section>
  );
}
