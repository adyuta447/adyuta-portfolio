"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  FolderGit2,
  FlaskConical,
  BadgeCheck,
  BookOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "../animations/theme-toggle";
import { ThemeChanger } from "../animations/theme-changer";
import Link from "next/link";
import socialLinks from "@/app/data/sociallinks";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Notes", href: "/notes", icon: FlaskConical },
  { label: "Certifications", href: "/certifications", icon: BadgeCheck },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Resume", href: "/resume", icon: FileText },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const mobileMenu = (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col bg-background transition-opacity duration-300 md:hidden",
        isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="font-mono text-sm tracking-tight"
        >
          Atuy.dev
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-foreground transition-colors active:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-col px-6">
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${index * 40 + 100}ms`
                : "0ms",
            }}
            className={cn(
              "flex items-center gap-4 border-b border-border/40 py-5 font-mono text-base uppercase tracking-widest transition-all duration-300",
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0",
              isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground active:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
            {isActive(item.href) && <span className="typing-cursor ml-auto" />}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-4 px-6 pb-10 pt-8">
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors active:bg-secondary"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
            <ThemeChanger />
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg bg-secondary/30 px-4 py-3 font-mono text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>status: available</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-2 left-2 right-2 mt-0 xl:mr-10 xl:ml-10 rounded-3xl z-50 transition-all duration-500",
          isScrolled && !isMobileMenuOpen
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-mono text-sm tracking-tight">Atuy.dev</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex ml-auto">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-lg",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    hoveredIndex === index &&
                      !isActive(item.href) &&
                      "text-foreground",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    className={cn(
                      "absolute left-1.5 text-primary transition-all duration-200",
                      isActive(item.href)
                        ? "opacity-100 translate-x-0"
                        : hoveredIndex === index
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2",
                    )}
                  >
                    {">"}
                  </span>
                  <span
                    className={cn(
                      "transition-transform duration-200",
                      (hoveredIndex === index || isActive(item.href)) &&
                        "translate-x-2",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                      isActive(item.href)
                        ? "w-6"
                        : hoveredIndex === index
                          ? "w-6"
                          : "w-0",
                    )}
                  />
                </Link>
              ))}
              <div className="ml-2 flex items-center gap-1">
                <ThemeChanger />
                <ThemeToggle />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden h-5 w-px bg-border sm:block" />

              <div className="hidden items-center gap-2.5 font-mono text-xs text-muted-foreground sm:flex px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>status: building</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 md:hidden transition-colors hover:bg-secondary"
                aria-label="Open menu"
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="h-0.5 w-5 bg-foreground" />
                  <span className="h-0.5 w-3.5 bg-foreground" />
                  <span className="h-0.5 w-5 bg-foreground" />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
