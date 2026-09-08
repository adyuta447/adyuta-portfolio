import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FileText } from "lucide-react";

import profile from "@/app/data/profile";
import education, { type Education } from "@/app/data/education";
import experiences, { type Experience } from "@/app/data/experiences";
import organizations, {
  type OrganizationExperience,
} from "@/app/data/organizations";
import honorsAwards, { type HonorAward } from "@/app/data/honors-awards";
import certifications from "@/app/data/certifications";
import skills from "@/app/data/skills";
import { toBullets } from "@/lib/utils";
import { ResumePrintButton } from "@/components/molecules/resume/print-button";
import {
  ResumeDocument,
  type ResumeBlock,
} from "@/components/molecules/resume/resume-document";

import "./print.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "A single-page resume for Jan Agra Adyuta Harnowo, auto-generated from portfolio data: education, experience, honors & awards, certifications, and skills.",
};

const monthIndex = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseCertDate(dateStr: string) {
  const [month, year] = dateStr.split(" ");
  return new Date(parseInt(year, 10), monthIndex.indexOf(month));
}

// Certification cut: "Penerapan"/"Membangun" (applied-tier) courses, the one
// "Expert"-tier course, and the HackerRank skill-verified credential.
// "Program DevHandal 2026" got swapped out for Architecting on AWS to keep
// cloud represented. The rest stay on LinkedIn; see the note in the section.
const RESUME_CERTIFICATION_IDS = [9, 18, 35, 39, 44, 45, 50, 52, 55];

const sortedCertifications = RESUME_CERTIFICATION_IDS.map((id) =>
  certifications.find((cert) => cert.id === id),
)
  .filter((cert): cert is (typeof certifications)[number] => Boolean(cert))
  .sort(
    (a, b) =>
      parseCertDate(a.dateRelease).getTime() -
      parseCertDate(b.dateRelease).getTime(),
  );

// Rendered straight from app/data/experiences.ts — the same source the site's
// Experience section reads, so editing a role's copy updates both surfaces.
const resumeExperiences: Experience[] = experiences;

const resumeOrganizations = organizations;

// Resume-only trim: keep the outright wins and the one still-open 2026
// semifinal; the rest (older semifinalist results and highschool-era
// olympiad participations) stay on LinkedIn to keep this to 2 pages.
const RESUME_HONOR_IDS = [1, 2, 3];
const resumeHonors: HonorAward[] = RESUME_HONOR_IDS.map((id) =>
  honorsAwards.find((item) => item.id === id),
)
  .filter((item): item is HonorAward => Boolean(item))
  .map((item) => ({ ...item, description: undefined }));

// Fallback for older entries that don't carry an explicit credentialId —
// derive one from the last meaningful segment of the verification URL.
function credentialIdFromUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    const ignored = new Set(["view", "linked_in_profile", "profile"]);
    let segment = segments[segments.length - 1];
    if (segment && ignored.has(segment) && segments.length > 1) {
      segment = segments[segments.length - 2];
    }
    return segment ? segment.replace(/\.(pdf|png|jpe?g)$/i, "") : null;
  } catch {
    return null;
  }
}

// Fixed point sizes on purpose: this is a facsimile of a printed document,
// so it must render identically regardless of viewport width and in print.
const bodyText = "text-[10.5pt] leading-snug";
const metaText = "text-[9.5pt]";

function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-1.5 border-b border-black pb-0.5 text-[12pt] font-bold uppercase tracking-wide">
      {children}
    </h2>
  );
}

/**
 * Builds one block per entry, each an atomic unit that must never be split
 * across a page. The first entry in a section carries the section header,
 * so header and first entry always land on the same page together.
 */
function sectionBlocks<T>(
  sectionId: string,
  title: string,
  items: T[],
  renderEntry: (item: T) => ReactNode,
): ResumeBlock[] {
  return items.map((item, index) => ({
    id: `${sectionId}-${index}`,
    node: (
      <div className={index === 0 ? "pt-4" : "pt-3"}>
        {index === 0 && <SectionHeader>{title}</SectionHeader>}
        {renderEntry(item)}
      </div>
    ),
  }));
}

function renderEducationEntry(item: Education) {
  return (
    <div className="resume-entry">
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 font-bold ${bodyText}`}
      >
        <span>{item.school}</span>
        <span>{item.location}</span>
      </div>
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 italic ${bodyText}`}
      >
        <span>{item.degree}</span>
        <span>
          {item.startDate} - {item.endDate}
        </span>
      </div>
    </div>
  );
}

function renderExperienceEntry(item: Experience) {
  return (
    <div className="resume-entry">
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 font-bold ${bodyText}`}
      >
        <span>{item.company}</span>
        <span>
          {item.locationType === "remote" ? "Work From Home" : item.location}
        </span>
      </div>
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 italic ${bodyText}`}
      >
        <span>{item.role}</span>
        <span>
          {item.startDate} - {item.endDate}
        </span>
      </div>
      {item.technologies.length > 0 && (
        <p className="mt-0.5 text-[9pt] leading-snug">
          {item.technologies.join(", ")}
        </p>
      )}
      <ul className={`ml-5 mt-1 list-disc space-y-0.5 ${bodyText}`}>
        {toBullets(item.description).map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

function renderOrganizationEntry(item: OrganizationExperience) {
  return (
    <div className="resume-entry">
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 font-bold ${bodyText}`}
      >
        <span>{item.role}</span>
        <span className="font-normal">
          {item.startDate} - {item.endDate}
        </span>
      </div>
      <div className={`italic ${bodyText}`}>{item.organization}</div>
      {item.description && (
        <p className={`mt-0.5 ${bodyText}`}>{item.description}</p>
      )}
    </div>
  );
}

function renderHonorEntry(item: HonorAward) {
  return (
    <div className="resume-entry">
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-2 font-bold ${bodyText}`}
      >
        <span>{item.title}</span>
        <span className="font-normal">{item.date}</span>
      </div>
      <div className={`italic ${bodyText}`}>{item.issuer}</div>
      {item.description && (
        <p className={`mt-0.5 ${bodyText}`}>{item.description}</p>
      )}
    </div>
  );
}

function headerBlock(): ResumeBlock {
  return {
    id: "header",
    node: (
      <>
        <div className="space-y-1 text-center">
          <p className="text-[18pt] font-bold uppercase tracking-wide">
            {profile.name}
          </p>
          <p
            className={`flex flex-wrap items-center justify-center gap-x-1.5 ${metaText}`}
          >
            <span>{profile.phone}</span>
            <span>|</span>
            <span>{profile.email}</span>
            <span>|</span>
            <a href={profile.linkedin} className="hover:underline">
              {profile.linkedin.replace(/^https?:\/\//, "")}
            </a>
            <span>|</span>
            <a href={profile.website} className="hover:underline">
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <p className={metaText}>{profile.location}</p>
        </div>
        <p className={`mt-3 text-justify ${bodyText}`}>{profile.summary}</p>
      </>
    ),
  };
}

function certificationBlocks(): ResumeBlock[] {
  const CHUNK_SIZE = 4;
  const blocks: ResumeBlock[] = [];

  for (let i = 0; i < sortedCertifications.length; i += CHUNK_SIZE) {
    const chunk = sortedCertifications.slice(i, i + CHUNK_SIZE);
    blocks.push({
      id: `certification-${i}`,
      node: (
        <div className={i === 0 ? "pt-4" : "pt-0"}>
          {i === 0 && <SectionHeader>Certification</SectionHeader>}
          <ul className={`ml-5 list-disc space-y-1 ${bodyText}`}>
            {chunk.map((cert) => {
              const credentialId =
                cert.credentialId ?? credentialIdFromUrl(cert.url);
              return (
                <li key={cert.id}>
                  {cert.url ? (
                    <a href={cert.url} className="hover:underline">
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                  , {cert.nameCompany}, {cert.dateRelease}
                  {credentialId && (
                    <>
                      {" "}
                      <span className="text-[9pt]">
                        (Cred. ID: {credentialId})
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ),
    });
  }

  blocks.push({
    id: "certification-note",
    node: (
      <p className={`pt-1 ${bodyText}`}>
        Full certification history ({certifications.length}+ IT credentials)
        available on{" "}
        <a href={profile.linkedin} className="hover:underline">
          LinkedIn
        </a>
        .
      </p>
    ),
  });

  return blocks;
}

// Same list the homepage's "system_info" terminal block shows (minus
// operating systems, which aren't really a resume "tech stack" line), so
// the resume and the site never disagree about what's in the stack.
const techStack = [
  ...skills.webTechnologies,
  ...skills.mlDataScience,
  ...skills.appTechnologies,
];

function skillBlock(): ResumeBlock {
  return {
    id: "skill",
    node: (
      <div className="pt-4">
        <SectionHeader>Skill</SectionHeader>
        <div className={`space-y-1 ${bodyText}`}>
          <p>
            <span className="font-bold">Tech Stack:</span>{" "}
            {techStack.join(", ")}.
          </p>
          <p>
            <span className="font-bold">Core Competencies:</span>{" "}
            {skills.coreCompetencies.join(", ")}.
          </p>
        </div>
      </div>
    ),
  };
}

function buildBlocks(): ResumeBlock[] {
  return [
    headerBlock(),
    ...sectionBlocks("education", "Education", education, renderEducationEntry),
    ...sectionBlocks(
      "experience",
      "Experience",
      resumeExperiences,
      renderExperienceEntry,
    ),
    ...sectionBlocks(
      "organization",
      "Organizational Experience",
      resumeOrganizations,
      renderOrganizationEntry,
    ),
    ...sectionBlocks(
      "honors",
      "Honors & Awards",
      resumeHonors,
      renderHonorEntry,
    ),
    ...certificationBlocks(),
    skillBlock(),
  ];
}

export default function ResumePage() {
  const blocks = buildBlocks();

  return (
    <div className="resume-shell px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="resume-shell mx-auto max-w-4xl">
        <div className="no-print mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              Auto-generated
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Resume
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
              Compiled from this portfolio&apos;s own data (education,
              experience, honors &amp; awards, certifications, and skills),
              paginated into real A4 pages, just like the exported PDF.
            </p>
          </div>
          <ResumePrintButton />
        </div>

        <ResumeDocument blocks={blocks} />

        <p className="no-print mx-auto mt-6 flex max-w-212.5 items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          Data sourced live from app/data — update it there and this resume
          updates too.
        </p>
      </div>
    </div>
  );
}
