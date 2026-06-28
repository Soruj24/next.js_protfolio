import { IProject } from "@/types"; 
import { FaLightbulb } from "react-icons/fa";

const Overview = ({ project }: { project: IProject }) => {
  return (
    <section className="project-section">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FaLightbulb className="text-cyan-400" />
        <span>Overview</span>
      </h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
          {project.fullDescription}
        </p>
      </div>
    </section>
  );
};

export default Overview;
