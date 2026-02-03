import { Navbar } from "@/components/organisms/navbar";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { LabNotes } from "@/components/lab-notes";
import Certifications from "@/components/organisms/certifications";
import Experiences from "@/components/organisms/experiences";
import HonorsAwards from "@/components/organisms/honors-awards";
import { Footer } from "@/components/organisms/footer";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { getGitHubRepos } from "@/lib/github";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "adyuta447";

export default async function Home() {
  const projects = await getGitHubRepos(GITHUB_USERNAME);
  return (
    <>
      <main className="relative min-h-screen overflow-hidden scanlines">
        <CursorGlow />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <Experiences />
          <LabNotes />
          <Certifications />
          <HonorsAwards />
          <ProjectsGrid projects={projects} showAll={false} limit={6} />
          <Footer />
        </div>
      </main>
    </>
  );
}
