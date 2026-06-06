interface ModalTechnologiesProps {
  technologies: string[];
}

export default function ModalTechnologies({ technologies }: ModalTechnologiesProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🛠️ Technologies</h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-xs sm:text-sm border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-300 break-words"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
