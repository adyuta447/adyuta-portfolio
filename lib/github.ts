export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  archived: boolean;
  pushed_at: string;
  fork: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: "shipped" | "in-progress" | "archived";
  year: string;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  featured: boolean;
  highlight?: boolean;
}

export async function getGitHubRepos(username: string): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Transform GitHub repos to Project format
    const projects: Project[] = repos
      .filter((repo) => !repo.fork) // Exclude forked repos
      .map((repo, index) => {
        const year = new Date(repo.created_at).getFullYear().toString();
        let status: "shipped" | "in-progress" | "archived" = "shipped";

        if (repo.archived) {
          status = "archived";
        } else {
          const lastUpdate = new Date(repo.pushed_at);
          const monthsSinceUpdate =
            (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24 * 30);
          if (monthsSinceUpdate < 3) {
            status = "in-progress";
          }
        }
        const tags: string[] = [];
        if (repo.language) tags.push(repo.language);
        tags.push(...repo.topics.slice(0, 4));

        return {
          id: index,
          title: repo.name,
          description: repo.description || "No description available",
          tags: tags.slice(0, 5),
          status,
          year,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          featured: repo.stargazers_count > 100, // Featured if has more than 100 stars
          highlight: repo.stargazers_count > 100, // Highlight if has more than 100 stars
        };
      })
      .sort((a, b) => b.stars - a.stars); // Sort by stars

    return projects;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
