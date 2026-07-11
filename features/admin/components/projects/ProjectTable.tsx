"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  Copy,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
  Star,
  StarOff,
  ExternalLink,
  Github,
  MoreHorizontal,
  Clock,
  Save,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";
import type { SortField } from "@/features/admin/hooks/useProjectManager";

interface ProjectTableProps {
  projects: IProject[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  sortField: SortField;
  sortDir: "asc" | "desc";
  onSort: (field: SortField) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onPublish: (id: string) => void;
  onFeature: (id: string) => void;
  onPreview: (project: IProject) => void;
  onSaveVersion: (id: string) => void;
  onShowVersions: (project: IProject) => void;
}

export default function ProjectTable({
  projects,
  selectedIds,
  onSelect,
  onSelectAll,
  sortField,
  sortDir,
  onSort,
  onDelete,
  onDuplicate,
  onArchive,
  onPublish,
  onFeature,
  onPreview,
  onSaveVersion,
  onShowVersions,
}: ProjectTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const allSelected = projects.length > 0 && projects.every((p) => selectedIds.has((p._id || p.id) as string));

  const SortHeader = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <th
      className={cn("px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-300 transition-colors", className)}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDir === "asc" ? <ChevronUp size={12} className="text-cyan-400" /> : <ChevronDown size={12} className="text-cyan-400" />
        )}
      </div>
    </th>
  );

  const getStatusBadge = (project: IProject) => {
    if (project.archived) return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">Archived</span>;
    if (project.published === false) return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Draft</span>;
    return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Published</span>;
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 w-12">
                <div
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all",
                    allSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-600 hover:border-gray-400",
                  )}
                  onClick={onSelectAll}
                >
                  {allSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </div>
              </th>
              <SortHeader field="title" className="min-w-[280px]">Project</SortHeader>
              <SortHeader field="category">Category</SortHeader>
              <SortHeader field="status">Status</SortHeader>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Featured</th>
              <SortHeader field="updatedAt">Updated</SortHeader>
              <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {projects.map((project) => {
              const id = (project._id || project.id) as string;
              const isSelected = selectedIds.has(id);
              return (
                <tr
                  key={id}
                  className={cn(
                    "group transition-colors",
                    isSelected ? "bg-cyan-500/[0.04]" : "hover:bg-white/[0.02]",
                  )}
                >
                  <td className="px-4 py-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all",
                        isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-600 hover:border-gray-400",
                      )}
                      onClick={() => onSelect(id)}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        {project.image ? (
                          <Image src={project.image} alt="" fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">{project.emoji || "📁"}</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-gray-400">{project.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(project)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {project.featured ? (
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                    ) : (
                      <StarOff size={14} className="text-gray-700" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 relative">
                      <button
                        onClick={() => onPreview(project)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                        title="Preview"
                      >
                        <Eye size={14} />
                      </button>
                      <Link
                        href={`/admin/projects/edit/${id}`}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === id ? null : id)}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {openMenu === id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
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
                              <button onClick={() => { onDuplicate(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                <Copy size={14} /> Duplicate
                              </button>
                              <button onClick={() => { onPublish(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                {project.published === false ? <><Eye size={14} /> Publish</> : <><EyeOff size={14} /> Unpublish</>}
                              </button>
                              <button onClick={() => { onFeature(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                {project.featured ? <><StarOff size={14} /> Unfeature</> : <><Star size={14} /> Feature</>}
                              </button>
                              <button onClick={() => { onArchive(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                {project.archived ? <><ArchiveRestore size={14} /> Unarchive</> : <><Archive size={14} /> Archive</>}
                              </button>
                              <button onClick={() => { onSaveVersion(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                <Save size={14} /> Save Version
                              </button>
                              {project.versions && project.versions.length > 0 && (
                                <button onClick={() => { onShowVersions(project); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                  <History size={14} /> Version History ({project.versions.length})
                                </button>
                              )}
                              <div className="h-px bg-white/[0.06] my-1" />
                              <button onClick={() => { onDelete(id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
