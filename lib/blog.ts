import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

// Path ke folder docs
const docsDirectory = path.join(process.cwd(), "docs");

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  date: string;
  readTime: string;
  category?: string;
  tags?: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  featured?: boolean;
  color?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  color?: string;
}

const defaultAuthor = {
  name: "Yuta",
  avatar: "/og-image.jpeg",
  role: "Web Developer",
};

const categoryColors: Record<string, string> = {
  frontend: "from-green-500/20 to-emerald-500/20",
  backend: "from-blue-500/20 to-cyan-500/20",
  ai: "from-purple-500/20 to-pink-500/20",
  systems: "from-orange-500/20 to-amber-500/20",
  design: "from-teal-500/20 to-cyan-500/20",
  default: "from-primary/20 to-secondary/20",
};


export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(docsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = getAllPostSlugs();

  const postsPromises = slugs.map(async (slug) => {
    const post = await getPostBySlug(slug);
    if (!post) return null;

    const meta: BlogPostMeta = {
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      color: post.color,
    };
    return meta;
  });

  const posts = await Promise.all(postsPromises);

  const validPosts = posts.filter(
    (post): post is BlogPostMeta => post !== null,
  );

  return validPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return undefined;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown
      .use(html, { sanitize: false }) // Allow raw HTML
      .process(content);

    let htmlContent = processedContent.toString();
    htmlContent = htmlContent.replace(
      /<pre><code class="language-(\w+)">/g,
      '<pre data-language="$1"><code class="language-$1">',
    );
    const stats = readingTime(content);
    const plainText = content
      .replace(/#{1,6}\s/g, "") // Remove headers
      .replace(/\*\*|__/g, "") // Remove bold
      .replace(/\*|_/g, "") // Remove italic
      .replace(/`{1,3}[^`]*`{1,3}/g, "") // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images
      .replace(/<[^>]+>/g, "") // Remove HTML tags
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();

    const excerpt = data.excerpt || plainText.slice(0, 200) + "...";

    // Parse date - handle format "2023-10-26" atau "2023-10-26 (Bahasa Indonesia)"
    let dateStr = data.date || new Date().toISOString();
    if (typeof dateStr === "string") {
      // Extract just the date part if there's additional text
      const dateMatch = dateStr.match(/\d{4}-\d{2}-\d{2}/);
      if (dateMatch) {
        dateStr = dateMatch[0];
      }
    }

    // Format date to readable format
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Determine category from tags or frontmatter
    const category = data.category || data.tags?.[0] || "general";

    return {
      slug,
      title: data.title || slug,
      subtitle: data.subtitle,
      excerpt,
      content,
      htmlContent,
      date: formattedDate,
      readTime: stats.text,
      category,
      tags: data.tags || [],
      author: {
        name: data.author?.name || defaultAuthor.name,
        avatar: data.author?.avatar || defaultAuthor.avatar,
        role: data.author?.role || defaultAuthor.role,
      },
      featured: data.featured || false,
      color: data.color || categoryColors[category] || categoryColors.default,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return undefined;
  }
}

/**
 * Get related posts based on category or tags
 */
export async function getRelatedPosts(
  currentSlug: string,
  limit = 3,
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  const currentPost = await getPostBySlug(currentSlug);

  if (!currentPost) return [];

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.tags?.some((tag) => currentPost.tags?.includes(tag)),
    )
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });

  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}
