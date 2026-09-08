export interface Skills {
  operatingSystems: string[];
  webTechnologies: string[];
  mlDataScience: string[];
  appTechnologies: string[];
  coreCompetencies: string[];
}

const skills: Skills = {
  operatingSystems: ["MacOS Tahoe", "Endavour OS", "Windows 11"],
  webTechnologies: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "SASS",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Supabase",
    "Laravel",
    "Webpack",
  ],
  mlDataScience: [
    "Python",
    "Jupyter",
    "Matplotlib",
    "TensorFlow",
    "PyTorch",
    "scikit-learn",
  ],
  appTechnologies: ["React Native", "SwiftUI"],
  coreCompetencies: [
    "Front-End Architecture",
    "Machine Learning (MLOps)",
    "Mobile Development",
    "Cybersecurity",
    "Penetration Testing",
    "Financial Management",
  ],
};

export default skills;
