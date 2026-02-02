"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes, type ThemeColor } from "@/lib/themes";

const STORAGE_KEY = "color-theme";
const THEME_KEYS: ThemeColor[] = [
  "golden",
  "cyan",
  "purple",
  "emerald",
  "rose",
];

export function ThemeChanger() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>("golden");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme, systemTheme } = useTheme();
  const themeInitialized = useRef(false);
  const currentThemeRef = useRef<ThemeColor>("emerald");

  useEffect(() => {
    if (themeInitialized.current) return;

    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeColor;
      if (savedTheme && themes[savedTheme]) {
        currentThemeRef.current = savedTheme;
        setCurrentTheme(savedTheme);
      } else {
        currentThemeRef.current = "emerald";
        setCurrentTheme("emerald");
      }
    }
    themeInitialized.current = true;
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEY &&
        e.newValue &&
        themes[e.newValue as ThemeColor]
      ) {
        currentThemeRef.current = e.newValue as ThemeColor;
        setCurrentTheme(e.newValue as ThemeColor);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (resolvedTheme === undefined) return;
    let themeToApply = currentThemeRef.current;

    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeColor;
      if (storedTheme && themes[storedTheme]) {
        if (storedTheme !== currentThemeRef.current) {
          currentThemeRef.current = storedTheme;
          setCurrentTheme(storedTheme);
        }
        themeToApply = storedTheme;
      }
    }

    applyTheme(themeToApply, resolvedTheme);
  }, [mounted, resolvedTheme]); // Only depend on resolvedTheme, not currentTheme

  const applyTheme = (themeName: ThemeColor, mode?: string | null) => {
    const themeConfig = themes[themeName];
    // Use resolvedTheme or fallback to systemTheme, default to "light"
    const effectiveMode = mode ?? systemTheme ?? "light";
    const isDark = effectiveMode === "dark";
    const colors = isDark ? themeConfig.dark : themeConfig.light;

    // Use double requestAnimationFrame to ensure DOM is updated after dark class change
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Object.entries(colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value);
        });
      });
    });
  };

  const handleThemeChange = (themeName: ThemeColor) => {
    currentThemeRef.current = themeName;
    setCurrentTheme(themeName);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, themeName);
    }
    const effectiveMode = resolvedTheme ?? systemTheme ?? "light";
    applyTheme(themeName, effectiveMode);
    setIsOpen(false);
  };

  const handleMobileColorCycle = () => {
    const currentIndex = THEME_KEYS.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEME_KEYS.length;
    const nextTheme = THEME_KEYS[nextIndex];
    handleThemeChange(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const themeColors: Record<ThemeColor, string> = {
    golden: "bg-gradient-to-br from-amber-400 to-yellow-600",
    cyan: "bg-gradient-to-br from-cyan-400 to-blue-500",
    purple: "bg-gradient-to-br from-purple-400 to-violet-600",
    emerald: "bg-gradient-to-br from-emerald-400 to-green-600",
    rose: "bg-gradient-to-br from-rose-400 to-pink-600",
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (isMobile) {
            handleMobileColorCycle();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          "group relative flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-all duration-300",
          "hover:text-primary hover:bg-primary/10",
          isOpen && !isMobile && "bg-primary/10 text-primary",
        )}
        aria-label="Change color theme"
      >
        <Palette className="h-4 w-4" />
        <span
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
            "rounded-md bg-card border border-border px-2.5 py-1",
            "font-mono text-[10px] text-muted-foreground",
            "opacity-0 transition-all duration-200 pointer-events-none shadow-lg",
            "group-hover:opacity-100 group-hover:-bottom-9",
            isMobile && "hidden",
          )}
        >
          Colors
        </span>
      </button>

      {isOpen && !isMobile && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute right-0 top-12 z-50",
              "w-48 rounded-lg border border-border",
              "bg-card/95 backdrop-blur-xl shadow-xl",
              "p-3 animate-fade-in",
            )}
          >
            <div className="mb-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Select Theme
            </div>
            <div className="space-y-1.5">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as ThemeColor)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "transition-all duration-200",
                    "hover:bg-secondary/80",
                    currentTheme === key
                      ? "bg-primary/10 border border-primary/50"
                      : "border border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 border-border shadow-sm",
                      themeColors[key as ThemeColor],
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-sm flex-1 text-left",
                      currentTheme === key
                        ? "text-foreground font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {theme.name}
                  </span>
                  {currentTheme === key && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
