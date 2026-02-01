"use client";
import Certifications from "@/components/organisms/certifications";
import type { Metadata } from "next";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, Clock, Activity } from "lucide-react";
import certifications from "@/app/data/certifications";

const parseDate = (dateStr: string) => {
  const [month, year] = dateStr.split(" ");
  const monthIndex = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].indexOf(month);
  return new Date(parseInt(year), monthIndex);
};

const recentAchievements = [...certifications]
  .sort(
    (a, b) =>
      parseDate(b.dateRelease).getTime() - parseDate(a.dateRelease).getTime(),
  )
  .slice(0, 4);

export default function CertificationsPage() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-24">
      {" "}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <div
            className={cn(
              "mb-12 sm:mb-16 space-y-4 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              Credentials
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              License & Certifications
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              A collection of professional certifications and credentials that
              validate my skills and continuous learning journey in technology.
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Sidebar - Show on top for mobile */}
            <div className="space-y-4 sm:space-y-6 lg:order-2">
              {/* Stats */}
              <div
                className={cn(
                  "rounded-xl border border-border bg-card/40 glass p-4 sm:p-5 opacity-0",
                  isVisible && "animate-fade-in-up stagger-3",
                )}
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3 sm:mb-4">
                  Overview
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-2.5 sm:p-3 rounded-lg bg-secondary/30">
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      {certifications.length}
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      Certificates
                    </p>
                  </div>
                  <div className="text-center p-2.5 sm:p-3 rounded-lg bg-secondary/30">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {new Set(certifications.map((c) => c.nameCompany)).size}
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      Providers
                    </p>
                  </div>
                  <div className="text-center p-2.5 sm:p-3 rounded-lg bg-secondary/30">
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      5+
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      Years Active
                    </p>
                  </div>
                  <div className="text-center p-2.5 sm:p-3 rounded-lg bg-secondary/30">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      2025
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      Latest Cert
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "hidden sm:block rounded-xl border border-border bg-card/40 glass p-4 sm:p-5 opacity-0",
                  isVisible && "animate-fade-in-up stagger-4",
                )}
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3 sm:mb-4 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  {recentAchievements.map((cert, index) => (
                    <a
                      key={cert.id}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-xs group hover:bg-secondary/20 rounded-md p-1 -m-1 transition-colors"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate group-hover:text-primary transition-colors">
                          {cert.name}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <span className="text-primary/70">
                            {cert.nameCompany}
                          </span>
                          <span className="mx-1">·</span>
                          <Clock className="h-3 w-3" />
                          {cert.dateRelease}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Terminal */}
            <div className="lg:col-span-2 lg:order-1">
              <div
                className={cn(
                  "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift opacity-0",
                  isVisible && "animate-scale-in stagger-2",
                )}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
                  </div>
                  <span className="ml-4 font-mono text-xs text-muted-foreground truncate">
                    ~/adyuta/certifications
                  </span>
                  <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-xs">live</span>
                  </div>
                </div>

                <div className="divide-y divide-border/30">
                  {certifications.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between opacity-0",
                        isVisible && "animate-fade-in",
                        hoveredItem === item.id && "bg-secondary/30",
                      )}
                      style={{ animationDelay: `${index * 80 + 300}ms` }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                          <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1 mt-0.5 sm:mt-0">
                            $
                          </span>
                          <h4 className="font-mono text-xs sm:text-sm font-medium tracking-tight transition-colors group-hover:text-gradient line-clamp-2 sm:truncate">
                            {item.name}
                          </h4>
                          <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pl-5 sm:pl-6">
                          <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
                            {item.nameCompany}
                          </p>
                          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground shrink-0 ml-2 sm:hidden">
                            {item.dateRelease}
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                          {item.dateRelease}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span className="text-primary">❯</span>
                    <span className="typing-cursor truncate">
                      cat certifications.md
                    </span>
                    <span className="ml-auto text-primary/50 hidden sm:block">
                      press enter to run
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
