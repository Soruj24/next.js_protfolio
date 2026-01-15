import React from "react";
import TechChip from "../ui/TechChip";

const TechStackGrid: React.FC = () => {
  const techStack = [
    "LangChain",
    "MCP Server",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "OpenAI",
    "Tailwind CSS",
    "GSAP",
    "Python",
    "FastAPI",
    "Docker",
    "AWS",
    "Git",
    "WebSocket",
    "Redis",
    "Pinecone",
    "Vector Databases",
    "AI Agents",
    "Custom Tools",
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
