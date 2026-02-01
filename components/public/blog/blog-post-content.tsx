"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  Twitter,
  Linkedin,
  Link2,
  ChevronUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-border/30">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none",
            post.color,
          )}
        />
        <div className="mx-auto max-w-4xl relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group opacity-0",
              isVisible && "animate-fade-in-up",
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono">back to blog</span>
          </Link>

          {/* Category & Meta */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 mb-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "100ms" }}
          >
            <span className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary uppercase tracking-wider">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-400">
                featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "150ms" }}
          >
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
              {post.title}
            </span>
          </h1>

          {/* Excerpt */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "200ms" }}
          >
            {post.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                />
                <AvatarFallback className="bg-secondary font-mono">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div
            className={cn(
              "flex flex-wrap gap-2 mt-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "300ms" }}
          >
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary/60 border border-border/50 px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Main Content */}
            <article
              ref={contentRef}
              className={cn(
                "prose prose-base sm:prose-lg dark:prose-invert max-w-none opacity-0 overflow-hidden",
                "prose-headings:font-semibold prose-headings:tracking-tight",
                "prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 sm:prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground prose-h2:border-b prose-h2:border-border prose-h2:pb-2",
                "prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground",
                "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4 sm:prose-p:my-5",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:break-words",
                "prose-strong:text-foreground prose-strong:font-semibold",
                "prose-code:text-primary prose-code:bg-secondary prose-code:px-1 sm:prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs sm:prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-border prose-code:break-words",
                "prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-3 sm:prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-sm",
                "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0 [&_pre_code]:text-white [&_pre_code]:text-sm",
                "prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-ul:my-4 prose-ol:my-4",
                "prose-li:marker:text-primary prose-li:my-2",
                "prose-blockquote:border-l-primary prose-blockquote:bg-secondary/50 prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:py-1 prose-blockquote:my-4 sm:prose-blockquote:my-6",
                "prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:my-6 sm:prose-img:my-8",
                "prose-hr:border-border prose-hr:my-6 sm:prose-hr:my-8",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "350ms" }}
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Sticky Share Sidebar */}
            <aside
              className={cn(
                "hidden lg:block opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "400ms" }}
            >
              <div className="sticky top-32 flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground mb-2 text-center">
                  share
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10",
                    copied && "border-primary/50 bg-primary/10",
                  )}
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </aside>
          </div>

          {/* Mobile Share Bar */}
          <div
            className={cn(
              "lg:hidden flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border/30 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "450ms" }}
          >
            <span className="font-mono text-xs text-muted-foreground">
              share:
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
              }
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-lg border-border/50",
                copied && "border-primary/50 bg-primary/10",
              )}
              onClick={handleCopyLink}
            >
              <Link2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full border border-border bg-card/90 glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
}
