export interface Education {
  id: number;
  school: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const EducationItem: Education[] = [
  {
    id: 1,
    school: "SMA Suluh Jakarta",
    location: "South Jakarta",
    degree: "High School Diploma, Science",
    startDate: "2022",
    endDate: "2025",
  },
  {
    id: 2,
    school: "Politeknik Negeri Jakarta",
    location: "Depok",
    degree: "Informatics & Computer Engineering, BASc",
    startDate: "2025",
    endDate: "2029",
  },
];

export default EducationItem;
