interface ModalLinksProps {
  githubUrl?: string;
  liveUrl?: string;
}

export default function ModalLinks({ githubUrl, liveUrl }: ModalLinksProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🔗 Links</h3>
      <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-center transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
          >
            📁 GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-center transition-all duration-300 border border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
          >
            🌐 Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
