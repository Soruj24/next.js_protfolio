"use client";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IProject } from "@/types";

interface AdminProjectCardProps {
  project: IProject;
  onDelete: (id: string) => void;
}

export default function AdminProjectCard({ project, onDelete }: AdminProjectCardProps) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="relative aspect-video overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{project.emoji || "🚀"}</span>
          <h3 className="text-xl font-bold text-white truncate">{project.title}</h3>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span key={tech} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 px-2 py-1 rounded-md border border-white/5">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-bold text-gray-500 self-center">+{project.technologies.length - 3} MORE</span>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/20" title="View Source">
                <Github size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/20" title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <Button asChild size="sm" variant="ghost" className="h-10 w-10 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl">
              <Link href={`/admin/projects/edit/${project._id || project.id}`}>
                <Pencil size={18} />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl" onClick={() => onDelete((project._id || project.id) as string)}>
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
