import { IProject } from "@/types";
import React from "react";
import { FaCode } from "react-icons/fa";

const Technologies = ({ project }: { project: IProject }) => {
  return (
    <section className="project-section p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FaCode className="text-cyan-400" />
        <span>Technologies</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm border border-white/10 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
