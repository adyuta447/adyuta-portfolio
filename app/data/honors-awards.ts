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
    issuer: "Innovare Universitas Indonesia",
    date: "Dec 2025",
  },
  {
    id: 2,
    title: "2nd Place Winner of Hackathon Computer Science Festival 2025",
    issuer: "Computer Science Festival 2025",
    date: "Nov 2025",
  },
  {
    id: 11,
    title: "Semifinalist in Hackathon x Digdaya Bank Indonesia 2026",
    issuer: "Bank Indonesia",
    date: "Aug 2026",
  },
  {
    id: 3,
    title:
      "Semifinalist in International Business Case Competition Ganesha Festival 2026",
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
    title: "Top 3 Semifinalist in Business Plan Competition by Vorment UI",
    issuer: "Vorment Universitas Indonesia",
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
  },
  {
    id: 9,
    title: "National Participant of Geography Olympiad",
    issuer: "HMD Geografi, Universitas Indonesia",
    date: "Oct 2023",
  },
  {
    id: 10,
    title: "Participants of the National Science Olympiad in Informatics 2023",
    issuer: "Perpusnas",
    date: "Mar 2023",
  },
];

export default HonorsAwardsItem;
