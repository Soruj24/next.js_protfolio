"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Eye, Star, StarOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";
import type { SortField } from "@/features/admin/hooks/useProjectManager";
import ProjectSortHeader from "./ProjectSortHeader";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectRowMenu from "./ProjectRowMenu";

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
  projects, selectedIds, onSelect, onSelectAll,
  sortField, sortDir, onSort,
  onDelete, onDuplicate, onArchive, onPublish, onFeature,
  onPreview, onSaveVersion, onShowVersions,
}: ProjectTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const allSelected = projects.length > 0 && projects.every((p) => selectedIds.has((p._id || p.id) as string));

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 w-12">
                <div className={cn("w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all", allSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-600 hover:border-gray-400")} onClick={onSelectAll}>
                  {allSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </div>
              </th>
              <ProjectSortHeader field="title" sortField={sortField} sortDir={sortDir} onSort={onSort} className="min-w-[280px]">Project</ProjectSortHeader>
              <ProjectSortHeader field="category" sortField={sortField} sortDir={sortDir} onSort={onSort}>Category</ProjectSortHeader>
              <ProjectSortHeader field="status" sortField={sortField} sortDir={sortDir} onSort={onSort}>Status</ProjectSortHeader>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Featured</th>
              <ProjectSortHeader field="updatedAt" sortField={sortField} sortDir={sortDir} onSort={onSort}>Updated</ProjectSortHeader>
              <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {projects.map((project) => {
              const id = (project._id || project.id) as string;
              const isSelected = selectedIds.has(id);
              return (
                <tr key={id} className={cn("group transition-colors", isSelected ? "bg-cyan-500/[0.04]" : "hover:bg-white/[0.02]")}>
                  <td className="px-4 py-3">
                    <div className={cn("w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all", isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-600 hover:border-gray-400")} onClick={() => onSelect(id)}>
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
                      <ProjectStatusBadge project={project} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {project.featured ? <Star size={14} className="text-amber-400 fill-amber-400" /> : <StarOff size={14} className="text-gray-700" />}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 relative">
                      <button onClick={() => onPreview(project)} className="p-1.5 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors" title="Preview">
                        <Eye size={14} />
                      </button>
                      <Link href={`/admin/projects/edit/${id}`} className="p-1.5 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors" title="Edit">
                        <Pencil size={14} />
                      </Link>
                      <ProjectRowMenu
                        project={project}
                        open={openMenu === id}
                        onToggle={() => setOpenMenu(openMenu === id ? null : id)}
                        onClose={() => setOpenMenu(null)}
                        onDuplicate={onDuplicate}
                        onPublish={onPublish}
                        onFeature={onFeature}
                        onArchive={onArchive}
                        onSaveVersion={onSaveVersion}
                        onShowVersions={onShowVersions}
                        onDelete={onDelete}
                      />
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
