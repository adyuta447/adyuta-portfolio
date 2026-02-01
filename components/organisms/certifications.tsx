import { cn } from "@/lib/utils";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import CertificationsItem from "@/app/data/certifications";
import Link from "next/link";
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
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Credentials
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            License & Certifications
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Professional certifications and credentials that validate my skills
            and expertise in various technologies and domains.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">
              ~/adyuta/certifications
            </span>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs">live</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
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
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
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
                  className="group flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <span>
                    View all {CertificationsItem.length} certifications
                  </span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
