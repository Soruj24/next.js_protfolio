import { IProject } from "@/types";
import { getCategoryGradient, getStatusColor, getDifficultyColor } from "./utils";

interface ModalHeaderProps {
  project: IProject;
  onClose: () => void;
}

export default function ModalHeader({ project, onClose }: ModalHeaderProps) {
  return (
    <div className="relative p-4 sm:p-6 lg:p-8 border-b border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r ${getCategoryGradient(project.category)} flex items-center justify-center text-xl sm:text-2xl lg:text-3xl shadow-lg flex-shrink-0`}
          >
            {project.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
              {project.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-2 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all duration-300 text-gray-400 hover:text-white flex-shrink-0"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6">
        <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status === "in-progress" ? "🚧 In Progress" : "✅ Completed"}
        </span>
        <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>
        <span className="px-3 py-1 sm:px-4 sm:py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30">
          ⏱️ {project.duration}
        </span>
        <span className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30">
          👥 {project.teamSize}
        </span>
        <span className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-400 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
          ❤️ {project.stats?.likes || 0}
        </span>
      </div>
    </div>
  );
}
