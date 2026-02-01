import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import { getGitHubRepos } from "@/lib/github";
import type { Metadata } from "next";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "adyuta447";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore open source projects, experiments, and tools. From web applications to systems programming, dive into the code.",
  keywords: [
    "open source",
    "projects",
    "web development",
    "systems programming",
    "experiments",
  ],
};

export default async function ProjectsPage() {
  const projects = await getGitHubRepos(GITHUB_USERNAME);
  return (
    <div className="pt-24">
      <ProjectsPageContent projects={projects} />
    </div>
  );
}
