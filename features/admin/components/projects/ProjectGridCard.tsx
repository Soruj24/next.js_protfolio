"use client";

import Image from "next/image";
import Link from "next/link";
import { Archive, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";

export default function ProjectGridCard({
  project, isSelected, onToggleSelect, onPreview, onDuplicate, onArchive,
}: {
  project: IProject;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onPreview: (project: IProject) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
}) {
  const id = (project._id || project.id) as string;

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
      <div className="absolute top-3 left-3 z-10">
        <div
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all backdrop-blur-md",
            isSelected ? "bg-cyan-500 border-cyan-500" : "border-white/30 hover:border-white/60 bg-black/20",
          )}
          onClick={() => onToggleSelect(id)}
        >
          {isSelected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-white/5">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">{project.emoji || "📁"}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{project.emoji}</span>
            <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn(
            "px-2 py-0.5 text-[10px] font-bold rounded-full border backdrop-blur-md",
            project.archived ? "bg-gray-500/20 text-gray-400 border-gray-500/30" :
            project.published === false ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
            "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
          )}>
            {project.archived ? "Archived" : project.published === false ? "Draft" : "Published"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{project.category}</span>
          {project.featured && <Star size={12} className="text-amber-400 fill-amber-400" />}
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 font-medium">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span key={tech} className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 rounded border border-white/[0.06]">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[9px] text-gray-600 font-semibold self-center">+{project.technologies.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1 pt-3 border-t border-white/[0.04]">
          <button onClick={() => onPreview(project)} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            Preview
          </button>
          <Link href={`/admin/projects/edit/${id}`} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors text-center">
            Edit
          </Link>
          <button onClick={() => onDuplicate(id)} className="py-1.5 px-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
          <button onClick={() => onArchive(id)} className="py-1.5 px-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            <Archive size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
