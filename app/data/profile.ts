export interface Profile {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  location: string;
  summary: string;
}

const profile: Profile = {
  name: "Jan Agra Adyuta Harnowo",
  title: "Front-End Engineer",
  phone: "087888380517",
  email: "yutaagra@gmail.com",
  linkedin: "https://www.linkedin.com/in/jan-agra-adyuta-harnowo",
  website: "https://adyuta.tech",
  location: "South Jakarta, Jakarta, Indonesia",
  summary:
    "Front-End Engineer with 6+ years of experience building scalable, secure, high-performance web applications in React.js, Next.js, and Tailwind CSS, with growing expertise in Machine Learning and MLOps. Experienced in bridging trained models into production through FastAPI/Flask serving, Docker containerization, and MLflow experiment tracking, backed by a cybersecurity background in data handling and application security. Co-Founder of CV. Digital Awan Nusantara, leading technical direction alongside financial and client management.",
};

export default profile;
