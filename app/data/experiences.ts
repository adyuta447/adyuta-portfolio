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
      "Directing the end-to-end development of web and mobile applications, focusing on robust Front-End architecture and user-centric design. Conducting in-depth technology research to select efficient tech stacks, reducing load times and improving system reliability. Prototyping new features and integrating cutting-edge libraries to keep product offerings competitive in the market.",
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
    location: "Jakarta, Indonesia",
    locationType: "remote",
    startDate: "Nov 2024",
    endDate: "Present",
    description:
      "Managing full-cycle company finances, including cash flow analysis, P&L reporting, and tax compliance (PPh 21, Annual SPT 1771). Leading hands-on product testing and User Acceptance Testing (UAT) to minimize bugs and ensure deliverables meet strict quality standards before launch. Overseeing daily operational workflows and administrative compliance to maintain organizational efficiency. Executed lean digital marketing strategies that increased customer engagement and maximized ROI with limited resources.",
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
      "Managed digital marketing strategies for e-commerce platforms (Shopee & TikTok Shop) with an average 5.0 seller rating. Built Maltéve's brand presence on Instagram through creative content, achieving over 8K engagements. Collaborated with the team to develop the brand's positioning as elegant and exclusive. Oversaw digital ad campaigns and implemented strategies to drive higher engagement.",
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
      "Carry out planning which includes setting goals and objectives, determining roles and scheduling tasks accordingly. Carry out monitoring and control activities to see the progress of the project in making the operating system. Identify and manage risks to ensure projects are on time, lead and motivate the project team, and select the technology used for the creation of the operating system. Manage the project which includes coordinating the project team to keep them on track and keep the operating system creation project in accordance with the technology used.",
    technologies: [
      "Operating Systems",
      "Linux",
      "Project Management",
      "Team Coordination",
    ],
  },
  {
    id: 5,
    company: "Ether Linux",
    role: "Frontend Developer",
    type: "full-time",
    location: "Indonesia",
    locationType: "remote",
    startDate: "Feb 2021",
    endDate: "Dec 2024",
    description:
      "Ensured the appearance of the website was designed according to the community's technical design. Designed the basic idea of how the website looks together with the community. Managed the speed of the website so it can run optimally. Used responsive design when creating website and application user interfaces. Functionally tested the site and app together with the rest of the development team.",
    technologies: [
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
