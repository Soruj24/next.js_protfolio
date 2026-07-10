export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "full-time" | "part-time" | "freelance" | "contract";
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Frontend Developer",
    company: "Freelance",
    companyUrl: "https://github.com/Soruj24",
    location: "Remote",
    period: "2023 - Present",
    startDate: "2023",
    endDate: "Present",
    description:
      "Building high-performance, accessible web applications for diverse clients using modern React ecosystem and cutting-edge frontend technologies.",
    achievements: [
      "Architected 15+ production-ready React/Next.js applications with Lighthouse scores above 95",
      "Implemented enterprise-level UI/UX designs with pixel-perfect accuracy using Tailwind CSS and shadcn/ui",
      "Built reusable component libraries reducing development time by 40% across projects",
      "Integrated complex state management solutions with Redux Toolkit and React Context",
      "Optimized Core Web Vitals achieving 90+ performance scores on all deployed applications",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Framer Motion",
      "GSAP",
    ],
    type: "freelance",
  },
  {
    id: "exp-2",
    role: "UI/UX Implementation Specialist",
    company: "Self-Employed",
    location: "Bangladesh",
    period: "2022 - 2023",
    startDate: "2022",
    endDate: "2023",
    description:
      "Specialized in translating design mockups into production-quality, responsive web interfaces with emphasis on micro-interactions and accessibility.",
    achievements: [
      "Delivered 10+ responsive web applications with cross-browser compatibility",
      "Implemented complex animation systems using GSAP and Framer Motion for enhanced UX",
      "Built accessible interfaces meeting WCAG 2.1 AA standards",
      "Created custom design systems and component libraries for client projects",
    ],
    technologies: [
      "JavaScript",
      "React",
      "CSS3",
      "GSAP",
      "Figma",
      "Responsive Design",
    ],
    type: "part-time",
  },
];

export const education: EducationItem[] = [
  {
    id: "edu-1",
    degree: "HSC Science",
    institution: "Higher Secondary Certificate",
    location: "Bangladesh",
    period: "2020 - 2022",
    description:
      "Completed Higher Secondary Education with a focus on Science, building a strong foundation in analytical thinking and problem-solving.",
    highlights: [
      "Strong foundation in Mathematics and Physics",
      "Developed analytical and logical thinking skills",
      "Self-taught frontend development alongside formal education",
    ],
  },
  {
    id: "edu-2",
    degree: "Professional Development",
    institution: "Self-Directed Learning",
    location: "Online",
    period: "2021 - Present",
    description:
      "Continuously mastering modern frontend technologies through structured online courses, official documentation, and hands-on project building.",
    highlights: [
      "Completed 500+ hours of structured React and Next.js training",
      "Built 20+ projects to solidify practical expertise",
      "Active contributor to open-source frontend projects",
      "Staying current with evolving web standards and best practices",
    ],
  },
];
