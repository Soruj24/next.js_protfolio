"use client";

import { Github, ExternalLink, BookOpen, FileText, Video } from "lucide-react";

interface ProjectLink {
  url: string | undefined;
  label: string;
  type: "github" | "demo" | "docs" | "case-study" | "video";
}

interface ProjectLinksProps {
  liveUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  caseStudyUrl?: string;
  demoVideoUrl?: string;
  className?: string;
  size?: "sm" | "md";
}

export default function ProjectLinks({
  liveUrl,
  githubUrl,
  documentationUrl,
  caseStudyUrl,
  demoVideoUrl,
  className = "",
  size = "sm",
}: ProjectLinksProps) {
  const links: ProjectLink[] = [];

  if (githubUrl) {
    links.push({ url: githubUrl, label: "Source Code", type: "github" });
  }
  if (liveUrl) {
    links.push({ url: liveUrl, label: "Live Demo", type: "demo" });
  }
  if (documentationUrl) {
    links.push({ url: documentationUrl, label: "Documentation", type: "docs" });
  }
  if (caseStudyUrl) {
    links.push({ url: caseStudyUrl, label: "Case Study", type: "case-study" });
  }
  if (demoVideoUrl) {
    links.push({ url: demoVideoUrl, label: "Demo Video", type: "video" });
  }

  if (links.length === 0) return null;

  const iconSize = size === "sm" ? 14 : 16;
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const padding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";

  const iconMap = {
    github: Github,
    demo: ExternalLink,
    docs: BookOpen,
    "case-study": FileText,
    video: Video,
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.type];

        return (
          <a
            key={link.type}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 ${textSize} ${padding} rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon size={iconSize} />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
