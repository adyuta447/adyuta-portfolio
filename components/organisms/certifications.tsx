import { ExternalLink, ArrowRight } from "lucide-react";
import CertificationsItem from "@/app/data/certifications";
import Link from "next/link";
import Head from "../atoms/head";
import { TerminalCard } from "../molecules/terminal/terminal-card";
import { TerminalCardContent } from "../molecules/terminal/terminal-content";
import { TerminalCardFooter } from "../molecules/terminal/terminal-footer";

const display_limit = 5;

export default function Certifications() {
  const sortedCertifications = [...CertificationsItem].sort(
    (a, b) => b.id - a.id,
  );
  const displayedCertifications = sortedCertifications.slice(0, display_limit);
  const hasMore = CertificationsItem.length > display_limit;

  return (
    <section
      id="certification"
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Credentials"
          title="Certifications"
          description="Verified credentials showcasing my expertise and commitment to continuous learning in the tech industry."
        />

        <TerminalCard
          path="~/adyuta/certifications"
          statusIcon={
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          }
          statusText="live"
        >
          <TerminalCardContent>
            {displayedCertifications.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between hover:bg-secondary/30 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      $
                    </span>
                    <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
                    {item.nameCompany}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {item.dateRelease}
                  </span>
                </div>
              </a>
            ))}
          </TerminalCardContent>

          <TerminalCardFooter>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="text-primary">❯</span>
                <span className="typing-cursor truncate">
                  ls -la credentials/
                </span>
              </div>
              {hasMore && (
                <Link
                  href="/certifications"
                  className="group flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 transition-colors shrink-0"
                >
                  <span className="hidden sm:inline">
                    View all {CertificationsItem.length} certifications
                  </span>
                  <span className="sm:hidden">View all</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </TerminalCardFooter>
        </TerminalCard>
      </div>
    </section>
  );
}
