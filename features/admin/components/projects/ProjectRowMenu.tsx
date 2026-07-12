"use client";

import {
  ExternalLink, Github, Copy, Eye, EyeOff, Star, StarOff, Archive, ArchiveRestore, Save, History, Trash2, MoreHorizontal,
} from "lucide-react";
import type { IProject } from "@/types";

export default function ProjectRowMenu({
  project, open, onToggle, onClose,
  onDuplicate, onPublish, onFeature, onArchive, onSaveVersion, onShowVersions, onDelete,
}: {
  project: IProject;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onFeature: (id: string) => void;
  onArchive: (id: string) => void;
  onSaveVersion: (id: string) => void;
  onShowVersions: (project: IProject) => void;
  onDelete: (id: string) => void;
}) {
  const id = (project._id || project.id) as string;

  return (
    <div className="relative">
      <button onClick={onToggle} className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-colors">
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 z-50 p-1.5 animate-fade-in-up">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <ExternalLink size={14} /> Live URL
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <Github size={14} /> GitHub
              </a>
            )}
            <div className="h-px bg-white/[0.06] my-1" />
            <button onClick={() => { onDuplicate(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              <Copy size={14} /> Duplicate
            </button>
            <button onClick={() => { onPublish(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              {project.published === false ? <><Eye size={14} /> Publish</> : <><EyeOff size={14} /> Unpublish</>}
            </button>
            <button onClick={() => { onFeature(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              {project.featured ? <><StarOff size={14} /> Unfeature</> : <><Star size={14} /> Feature</>}
            </button>
            <button onClick={() => { onArchive(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              {project.archived ? <><ArchiveRestore size={14} /> Unarchive</> : <><Archive size={14} /> Archive</>}
            </button>
            <button onClick={() => { onSaveVersion(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              <Save size={14} /> Save Version
            </button>
            {project.versions && project.versions.length > 0 && (
              <button onClick={() => { onShowVersions(project); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <History size={14} /> Version History ({project.versions.length})
              </button>
            )}
            <div className="h-px bg-white/[0.06] my-1" />
            <button onClick={() => { onDelete(id); onClose(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
