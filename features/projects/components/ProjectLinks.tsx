import { Github, ExternalLink, FileText, Video } from "lucide-react";

interface ProjectLinksProps {
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  caseStudyUrl?: string;
  demoVideoUrl?: string;
}

export default function ProjectLinks({
  githubUrl,
  liveUrl,
  documentationUrl,
  caseStudyUrl,
  demoVideoUrl,
}: ProjectLinksProps) {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasAny = githubUrl || liveUrl || documentationUrl || caseStudyUrl || demoVideoUrl;

  return (
    <div className="flex gap-2">
      {githubUrl && (
        <button
          onClick={(e) => handleLinkClick(e, githubUrl)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="View Source Code"
          aria-label="View Source Code"
        >
          <Github className="text-white group-hover/link:text-cyan-400" />
        </button>
      )}
      {liveUrl && (
        <button
          onClick={(e) => handleLinkClick(e, liveUrl)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="Live Demo"
          aria-label="Live Demo"
        >
          <ExternalLink className="text-white text-xs group-hover/link:text-cyan-400" />
        </button>
      )}
      {documentationUrl && (
        <button
          onClick={(e) => handleLinkClick(e, documentationUrl)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="Documentation"
          aria-label="Documentation"
        >
          <FileText className="text-white text-xs group-hover/link:text-cyan-400" />
        </button>
      )}
      {caseStudyUrl && (
        <button
          onClick={(e) => handleLinkClick(e, caseStudyUrl)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="Case Study"
          aria-label="Case Study"
        >
          <FileText className="text-white text-xs group-hover/link:text-cyan-400" />
        </button>
      )}
      {demoVideoUrl && (
        <button
          onClick={(e) => handleLinkClick(e, demoVideoUrl)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-cyan-500/50 transition-all group/link"
          title="Demo Video"
          aria-label="Demo Video"
        >
          <Video className="text-white text-xs group-hover/link:text-cyan-400" />
        </button>
      )}
      {!hasAny && (
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
          <span className="text-white">↗</span>
        </div>
      )}
    </div>
  );
}
