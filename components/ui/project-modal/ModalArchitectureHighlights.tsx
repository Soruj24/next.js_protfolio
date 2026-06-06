import { IProject } from "@/types";

interface ModalArchitectureHighlightsProps {
  project: IProject;
}

export default function ModalArchitectureHighlights({ project }: ModalArchitectureHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🏗️ Architecture</h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10">
          {project.architecture}
        </p>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🚀 Development Highlights</h3>
        <div className="space-y-2 sm:space-y-3">
          {project.developmentHighlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <h4 className="font-semibold text-cyan-400 text-sm sm:text-base mb-1">{highlight.title}</h4>
              <p className="text-gray-300 text-xs sm:text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
