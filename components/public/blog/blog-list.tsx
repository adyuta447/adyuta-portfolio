import { getAllPosts } from "@/lib/blog";
import { BlogListClient } from "./blog-list-client";
import { BlogSidebar } from "./blog-sidebar";

export async function BlogList() {
  const posts = await getAllPosts();

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
      <BlogListClient posts={posts} />
      <BlogSidebar posts={posts} />
    </div>
  );
}
