import type { BlogPost } from "./blog";

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      url: "https://github.com/adyuta447",
    },
    publisher: {
      "@type": "Person",
      name: "Adyuta",
      url: url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(", ") || "",
    timeRequired: post.readTime,
  };
}

export function generateWebsiteStructuredData(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adyuta",
    description:
      "Personal portfolio of Jan Agra Adyuta Harnowo, showcasing projects, blog posts, and experiments in software engineering, web development, AI, and more.",
    url: url,
    author: {
      "@type": "Person",
      name: "Jan Agra Adyuta Harnowo",
      url: "https://github.com/adyuta447",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Agra Adyuta Harnowo",
    url: "https://adyuta447.github.io",
    image: "https://adyuta447.github.io/og-image.jpeg",
    sameAs: [
      "https://github.com/adyuta447",
      "https://linkedin.com/in/jan-agra-adyuta-harnowo",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Adyuta",
    },
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
