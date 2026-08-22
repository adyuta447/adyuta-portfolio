export interface Experience {
  id: number;
  company: string;
  role: string;
  type: "full-time" | "part-time" | "freelance" | "contract" | "internship";
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  startDate: string;
  endDate: string | "Present";
  description: string;
  technologies: string[];
  url?: string;
}

const ExperiencesItem: Experience[] = [
  {
    id: 1,
    company: "Arkakode",
    role: "Co-Founder & Lead Engineer",
    type: "full-time",
    location: "Jakarta, Indonesia",
    locationType: "remote",
    startDate: "Aug 2025",
    endDate: "Present",
    description:
      "Directing end-to-end development of web and mobile applications with a focus on robust Front-End architecture and user-centric design. Researching and prototyping efficient tech stacks to keep product offerings fast and competitive.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "HTML/CSS",
      "React Native",
      "Laravel",
      "CI/CD",
      "GraphQL",
    ],
    url: "https://arkakode.com",
  },
  {
    id: 2,
    company: "CV. Digital Awan Nusantara",
    role: "Co-Founder",
    type: "full-time",
    location: "Jakarta, Indonesia",
    locationType: "remote",
    startDate: "Nov 2024",
    endDate: "Present",
    description:
      "Managed digital marketing and e-commerce operations across Shopee and TikTok Shop, maintaining a 5.0 seller rating. Grew the brand's Instagram presence past 8K engagements while shaping its elegant, exclusive positioning through digital ad campaigns.",
    technologies: [
      "Budgeting & Expense Control",
      "Data Analysis",
      "Risk Management",
      "Performance Tracking",
    ],
  },
  {
    id: 3,
    company: "Maltéve",
    role: "Co-Founder",
    type: "part-time",
    location: "Jakarta",
    locationType: "hybrid",
    startDate: "May 2024",
    endDate: "Jan 2026",
    description:
      "Managed digital marketing and e-commerce operations across Shopee and TikTok Shop, maintaining a 5.0 seller rating. Grew the brand's Instagram presence past 8K engagements while shaping its elegant, exclusive positioning through digital ad campaigns.",
    technologies: [
      "Digital Marketing",
      "E-Commerce",
      "Brand Positioning",
      "Digital Advertising",
      "Shopify",
    ],
  },
  {
    id: 4,
    company: "Ether Linux",
    role: "Project Manager",
    type: "full-time",
    location: "Indonesia",
    locationType: "remote",
    startDate: "Jun 2021",
    endDate: "Dec 2024",
    description:
      "Led planning, risk management, and team coordination for the Ether Linux operating system project, keeping a distributed volunteer team aligned on scope and deadlines across a 3-year build. Built and maintained the project's front-end with React, Next.js, and TypeScript, turning community design input into a responsive, production website. Balanced project leadership with hands-on front-end delivery to ship the OS release on schedule.",
    technologies: [
      "Operating Systems",
      "Linux",
      "Project Management",
      "Team Coordination",
      "React",
      "JavaScript",
      "HTML/CSS",
      "Next.js",
      "TypeScript",
      "Git",
    ],
  },
];

export default ExperiencesItem;
