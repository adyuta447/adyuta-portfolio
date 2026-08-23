import { Navbar } from "@/components/organisms/navbar";
import { HeroSection } from "@/components/organisms/hero-section";
import TechStack from "@/components/organisms/tech-stack";
import { ProjectsGrid } from "@/components/organisms/projects-grid";
import { LabNotes } from "@/components/organisms/lab-notes";
import Certifications from "@/components/organisms/certifications";
import Education from "@/components/organisms/education";
import Experiences from "@/components/organisms/experiences";
import OrganizationalExperience from "@/components/organisms/organizational-experience";
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
          <TechStack />
          <Education />
          <Experiences />
          <OrganizationalExperience />
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
