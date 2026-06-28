import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectLinksProps {
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectLinks({ githubUrl, liveUrl }: ProjectLinksProps) {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex gap-2">
      {githubUrl && (
        <button
          onClick={(e) => handleLinkClick(e, githubUrl!)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="View Source Code"
        >
          <FaGithub className="text-white group-hover/link:text-cyan-400" />
        </button>
      )}
      {liveUrl && (
        <button
          onClick={(e) => handleLinkClick(e, liveUrl!)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="Live Demo"
        >
          <FaExternalLinkAlt className="text-white text-xs group-hover/link:text-cyan-400" />
        </button>
      )}
      {!githubUrl && !liveUrl && (
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
          <span className="text-white">↗</span>
        </div>
      )}
    </div>
  );
}
