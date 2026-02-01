import { BlogHero } from "@/components/public/blog/blog-hero";
import { BlogList } from "@/components/public/blog/blog-list";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atuy.dev";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles, experiments, and insights from the digital laboratory.",
  openGraph: {
    title: "Blog — Adyuta",
    description:
      "Technical articles, experiments, and insights from the digital laboratory.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: "Adyuta Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Adyuta",
    description:
      "Technical articles, experiments, and insights from the digital laboratory.",
    images: [`${baseUrl}/og-image-blog.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <BlogList />
        </div>
      </section>
    </div>
  );
}
