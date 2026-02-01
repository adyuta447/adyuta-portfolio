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
      "2nd Place for Best Marketing Team, Business Plan InnoClub (Innovare 2025)",
    issuer: "InnoClub Universitas Indonesia",
    date: "Dec 2025",
    description:
      "Awarded 2nd Place for Best Marketing Team in the Business Plan category at Innovare 2025.",
  },
  {
    id: 2,
    title: "2nd Place Winner of Hackathon Computer Science Festival 2025",
    issuer: "Politeknik Negeri Jakarta",
    date: "Nov 2025",
    description:
      "Secured 2nd Place in the Hackathon event at Computer Science Festival 2025.",
  },
  {
    id: 3,
    title: "Semifinalist (Top 3) in Business Plan Competition by Vorment UI",
    issuer: "Vorment Universitas Indonesia",
    date: "Oct 2024",
    description:
      "Recognized as a Semifinalist (Top 3) in the Business Plan Competition organized by Vorment UI.",
  },
  {
    id: 4,
    title:
      "Semifinalist in Business Plan Competition organized by UI Innovation War",
    issuer: "UI Innovation War",
    date: "Mar 2024",
    description:
      "Achieved Semifinalist status in the Business Plan Competition hosted by UI Innovation War.",
  },
  {
    id: 5,
    title: "Semifinalist National Digital League Web Development 2024",
    issuer: "Skilvul Indonesia",
    date: "Mar 2024",
    description:
      "Achieved Semifinalist status in the National Digital League Web Development competition organized by Skilvul Indonesia.",
  },
  {
    id: 6,
    title: "Participants of the National Science Olympiad in Informatics 2024",
    issuer: "Pusat Prestasi Nasional",
    date: "Mar 2024",
    description:
      "Participated in the National Science Olympiad in Informatics 2024 organized by Pusat Prestasi Nasional.",
  },
  {
    id: 7,
    title: "National Participant of Geography Olympiad",
    issuer: "HMD Geografi FMIPA UI",
    date: "Oct 2023",
    description:
      "Recognized as a National Participant in the Geography Olympiad organized by HMD Geografi FMIPA UI.",
  },
  {
    id: 8,
    title: "Participants of the National Science Olympiad in Informatics 2023",
    issuer: "Pusat Prestasi Nasional",
    date: "Mar 2023",
    description:
      "Participated in the National Science Olympiad in Informatics 2023 organized by Pusat Prestasi Nasional.",
  },
];

export default HonorsAwardsItem;
