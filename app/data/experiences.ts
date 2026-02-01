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
    company: "arkakode",
    role: "Co-Founder & Lead Engineer",
    type: "full-time",
    location: "Indonesia",
    locationType: "remote",
    startDate: "Jan 2025",
    endDate: "Present",
    description:
      "Leading technical development and architecture decisions. Building scalable web applications and managing a team of developers.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "HTML/CSS",
      "React Native",
      "Laravel",
    ],
    url: "https://arkakode.com",
  },
  {
    id: 2,
    company: "CV. Digital Awan Nusantara",
    role: "Co-Founder",
    type: "full-time",
    location: "Indonesia",
    locationType: "remote",
    startDate: "Nov 2024",
    endDate: "Present",
    description:
      "Managed end-to-end company finances (cash flow, P&L, and tax compliance), ensured product quality through UAT, oversaw daily operations, and executed lean digital marketing strategies to boost engagement and ROI.",
    technologies: [
      "Budgeting & Expense Control",
      "Data Analysis",
      "Risk Management",
      "Performance Tracking",
    ],
  },
  {
    id: 3,
    company: "Malteve",
    role: "Co-Founder",
    type: "part-time",
    location: "Indonesia",
    locationType: "hybrid",
    startDate: "May 2024",
    endDate: "Present",
    description:
      "Managed e-commerce and social media marketing (Shopee, TikTok Shop, and Instagram), strengthened Malteve’s elegant brand positioning, and drove high engagement through creative content and digital ad campaigns.",
    technologies: [
      "Digital Marketing",
      "Brand Positioning",
      "Digital Advertising",
      "Engagement Strategies",
    ],
  },
  {
    id: 4,
    company: "Ether Linux",
    role: "Front-End Dev & Project Manager",
    type: "part-time",
    location: "Indonesia",
    locationType: "hybrid",
    startDate: "Feb 2021",
    endDate: "Dec 2024",
    description:
      "Developed and maintained the front-end of the Ether Linux project, coordinated project timelines, and managed a team of developers to ensure timely delivery of features.",
    technologies: [
      "React",
      "JavaScript",
      "HTML/CSS",
      "Next.js",
      "Operating Systems",
      "Linux",
      "TypeScript",
      "Git",
      "Project Management",
      "Team Coordination",
    ],
  },
];

export default ExperiencesItem;
