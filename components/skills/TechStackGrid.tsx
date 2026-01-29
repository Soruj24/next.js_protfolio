import React from "react";
import TechChip from "../ui/TechChip";

const TechStackGrid: React.FC = () => {
  const techStack = [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Redux Toolkit",
    "Zustand",
    "TanStack Query",
    "Vite",
    "JavaScript ES6+",
    "HTML5 / CSS3",
    "SASS / SCSS",
    "Radix UI",
    "Shadcn UI",
    "Responsive Design",
    "UI/UX Principles",
    "Git & GitHub",
    "RESTful APIs",
    "GraphQL",
    "Unit Testing",
    "Web Performance",
    "SEO Optimization",
    "CI/CD",
  ];

  return (
    <div className="mt-20 text-center">
      <h3 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Technology Stack
      </h3>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {techStack.map((tech, index) => (
          <TechChip key={tech} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechStackGrid;
