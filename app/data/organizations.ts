export interface OrganizationExperience {
  id: number;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description?: string;
}

const OrganizationsItem: OrganizationExperience[] = [
  {
    id: 21,
    organization: "INNOVARE Universitas Indonesia",
    role: "Guest Speaker, INNOClub 2026 Grand Launching",
    startDate: "Aug 2026",
    endDate: "Aug 2026",
    description:
      "Invited by INNOVARE Universitas Indonesia to speak at the INNOClub 2026 Grand Launching.",
  },
  {
    id: 1,
    organization:
      "Himpunan Mahasiswa Teknik Informatika dan Komputer PNJ (HIMATIK PNJ)",
    role: "Staff of Competition Division (Web Development), ITechno Cup 2026",
    startDate: "May 2026",
    endDate: "Present",
  },
  {
    id: 2,
    organization:
      "Himpunan Mahasiswa Teknik Informatika dan Komputer PNJ (HIMATIK PNJ)",
    role: "Staff of Finance Division, Satu Aksi Untuk Masyarakat 2026",
    startDate: "Apr 2026",
    endDate: "Aug 2026",
  },
  {
    id: 3,
    organization:
      "Himpunan Mahasiswa Teknik Informatika dan Komputer PNJ (HIMATIK PNJ)",
    role: "Staff of Funds & Sponsorship Division, TIKGAMES 2026",
    startDate: "Apr 2026",
    endDate: "Jul 2026",
  },
  {
    id: 4,
    organization: "Computer Student Club",
    role: "Member, Software Development",
    startDate: "Feb 2026",
    endDate: "Present",
  },
  {
    id: 5,
    organization: "EXPECTIK (Exploration and Perception Week of TIK) PNJ",
    role: "Chief Financial Officer, CSFEST 2025",
    startDate: "Oct 2025",
    endDate: "Dec 2025",
  },
];

export default OrganizationsItem;
