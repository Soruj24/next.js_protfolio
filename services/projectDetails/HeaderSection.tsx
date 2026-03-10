import { IProject } from "@/types";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const HeaderSection = ({ project }: { project: IProject }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
            {project.category}
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
            {project.status}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          {project.title || "Project Title"}
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          {project.description || "Project Description"}
        </p>
      </div>

      <div className="flex gap-4">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 group"
            title="View Source Code"
          >
            <FaGithub className="text-2xl group-hover:text-cyan-400" />
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <FaExternalLinkAlt />
            <span>Live Demo</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;
