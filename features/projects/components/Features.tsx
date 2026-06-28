import { IProject } from "@/types";
import React from "react";
import { FaCheckCircle, FaRocket } from "react-icons/fa";

const Features = ({ project }: { project: IProject }) => {
  return (
    <section className="project-section">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FaRocket className="text-purple-400" />
        <span>Key Features</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10"
          >
            <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
