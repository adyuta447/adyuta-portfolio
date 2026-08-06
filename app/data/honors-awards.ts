export interface HonorAward {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
}

const HonorsAwardsItem: HonorAward[] = [
  {
    id: 1,
    title:
      "1st Place for Best Marketing Team, Business Plan Competition (Innovare 2025)",
    issuer: "Innovare UI",
    date: "Dec 2025",
    description:
      "Sole recipient of the Best Marketing Team award at Innovare UI, recognizing excellence in marketing strategy, branding, and go-to-market execution.",
  },
  {
    id: 2,
    title: "2nd Place Winner of Hackathon Computer Science Festival 2025",
    issuer: "Expectik",
    date: "Nov 2025",
    description:
      "Achieved 2nd place in the Hackathon Computer Science Festival 2025 by developing a Smart Lost & Found System featuring complaint management, lost and found item management, and a centralized dashboard for summary and monitoring.",
  },
  {
    id: 3,
    title: "Semifinalist in International Business Case Competition Ganesha Festival 2026",
    issuer: "Ganesha Festival ITB",
    date: "May 2026",
  },
  {
    id: 4,
    title: "Semifinalist in Business Plan Competition IYREF ITB 2026",
    issuer: "IYREF ITB 2026",
    date: "Apr 2026",
  },
  {
    id: 5,
    title: "Semifinalist (Top 3) in Business Plan Competition by Vorment UI",
    issuer: "Vorment UI",
    date: "Oct 2024",
  },
  {
    id: 6,
    title:
      "Semifinalist in Business Plan Competition organized by UI Innovation War",
    issuer: "UI Innovation War",
    date: "Oct 2024",
  },
  {
    id: 7,
    title: "Semifinalist National Digital League Web Development 2024",
    issuer: "Skilvul",
    date: "Mar 2024",
  },
  {
    id: 8,
    title: "Participants of the National Science Olympiad in Informatics 2024",
    issuer: "Perpusnas",
    date: "Mar 2024",
    description:
      "Associated with SMAS Suluh Jakarta. Developed strong problem-solving skills tackling complex computational problems under time constraints, gained experience in algorithm optimization and coding efficiency using C & C++, and strengthened resilience in high-pressure problem-solving scenarios.",
  },
  {
    id: 9,
    title: "National Participant of Geography Olympiad",
    issuer: "HMD Geografi, Universitas Indonesia",
    date: "Oct 2023",
    description: "Associated with SMAS Suluh Jakarta.",
  },
  {
    id: 10,
    title: "Participants of the National Science Olympiad in Informatics 2023",
    issuer: "Perpusnas",
    date: "Mar 2023",
  },
];

export default HonorsAwardsItem;
