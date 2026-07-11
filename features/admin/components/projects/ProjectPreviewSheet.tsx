"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Github,
  Star,
  Archive,
  Clock,
  Calendar,
  Users,
  Gauge,
  Tag,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";

interface ProjectPreviewSheetProps {
  project: IProject | null;
  onClose: () => void;
}

export default function ProjectPreviewSheet({ project, onClose }: ProjectPreviewSheetProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#06060b]/98 backdrop-blur-2xl border-l border-white/[0.08] overflow-y-auto animate-slide-in-right shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#06060b]/80 backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white">Project Preview</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          {project.image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/[0.08]">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{project.emoji}</span>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md text-white rounded-full border border-white/20">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                      <Star size={10} className="fill-current" /> Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              </div>
            </div>
          )}

          {/* Status bar */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-full border",
              project.archived ? "bg-gray-500/10 text-gray-400 border-gray-500/20" :
              project.published === false ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
              "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            )}>
              {project.archived ? "Archived" : project.published === false ? "Draft" : "Published"}
            </span>
            <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/5 text-gray-300 border border-white/10">
              {project.status}
            </span>
            <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/5 text-gray-300 border border-white/10">
              {project.difficulty}
            </span>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Clock, label: "Duration", value: project.duration },
              { icon: Users, label: "Team", value: project.teamSize },
              { icon: Gauge, label: "Complexity", value: project.stats?.complexity },
              { icon: Calendar, label: "Completed", value: new Date(project.completionDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
            ].filter(m => m.value).map((m) => (
              <div key={m.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <m.icon size={12} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-sm font-semibold text-white">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-gray-300 font-medium leading-relaxed">{project.description}</p>
          </div>

          {project.fullDescription && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Description</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">{project.fullDescription}</p>
            </div>
          )}

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Features</h4>
              <div className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance */}
          {project.performance && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Performance</h4>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: "Load", value: project.performance.loadTime },
                  { label: "A11y", value: project.performance.accessibility },
                  { label: "Best", value: project.performance.bestPractices },
                  { label: "Interact", value: project.performance.interactivity },
                  { label: "SEO", value: project.performance.seo },
                ].filter(m => m.value !== undefined).map((m) => (
                  <div key={m.label} className="text-center rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                    <p className={cn(
                      "text-lg font-bold",
                      (m.value || 0) >= 90 ? "text-emerald-400" : (m.value || 0) >= 50 ? "text-amber-400" : "text-red-400",
                    )}>{m.value}</p>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-gray-400 bg-white/5 rounded-md border border-white/[0.06]">
                    <Tag size={9} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-gray-300 text-sm font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                <Github size={14} /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
