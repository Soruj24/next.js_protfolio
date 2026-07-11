"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  LayoutGrid,
  LayoutList,
  Trash2,
  Archive,
  Eye,
  Star,
  FolderOpen,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";
import { useProjectManager } from "@/features/admin/hooks/useProjectManager";
import type { StatusFilter } from "@/features/admin/hooks/useProjectManager";
import ProjectTable from "./ProjectTable";
import ProjectPreviewSheet from "./ProjectPreviewSheet";
import VersionHistory from "./VersionHistory";
import ConfirmAction from "./ConfirmAction";

export default function ProjectManager() {
  const {
    loading, searchQuery, setSearchQuery,
    filterCategory, setFilterCategory,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages,
    paginatedProjects, filteredProjects, ITEMS_PER_PAGE,
    selectedIds, toggleSelect, toggleSelectAll, clearSelection,
    sortField, sortDir, sort,
    viewMode, setViewMode,
    previewProject, setPreviewProject,
    confirmAction, setConfirmAction,
    versionHistory, setVersionHistory,
    categories,
    deleteProject, duplicateProject, toggleArchive, togglePublish, toggleFeatured, saveVersion,
    bulkDelete, bulkArchive, bulkPublish, bulkFeature,
    fetchProjects,
  } = useProjectManager();

  const statusFilters: { value: string; label: string }[] = [
    { value: "all", label: "All" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Drafts" },
    { value: "archived", label: "Archived" },
    { value: "featured", label: "Featured" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-white/5 rounded-xl" />
            <div className="h-4 w-96 bg-white/[0.03] rounded-lg" />
          </div>
          <div className="h-12 w-40 bg-white/5 rounded-xl" />
        </div>
        <div className="h-14 bg-white/[0.02] rounded-2xl border border-white/[0.06]" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/[0.02] rounded-xl border border-white/[0.06]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-5 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]">
          <Link href="/admin/projects/new">
            <Plus className="mr-2" size={18} />
            New Project
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/30 focus:bg-white/[0.06] transition-all font-medium"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border",
                  filterCategory === cat
                    ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-white/[0.03] text-gray-500 border-white/[0.06] hover:border-white/10 hover:text-gray-300",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-300 font-medium outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
            >
              {statusFilters.map((sf) => (
                <option key={sf.value} value={sf.value}>{sf.label}</option>
              ))}
            </select>
            <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "table" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500 hover:text-gray-300",
              )}
              title="Table view"
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "grid" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500 hover:text-gray-300",
              )}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Bulk actions bar */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.06] animate-fade-in">
            <span className="text-xs font-semibold text-cyan-400">
              {selectedIds.size} selected
            </span>
            <div className="flex items-center gap-2">
              <button onClick={bulkPublish} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-colors">
                <Eye size={12} /> Publish
              </button>
              <button onClick={bulkFeature} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-colors">
                <Star size={12} /> Feature
              </button>
              <button onClick={bulkArchive} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Archive size={12} /> Archive
              </button>
              <button onClick={bulkDelete} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
            <button onClick={clearSelection} className="ml-auto text-xs text-gray-500 hover:text-gray-300 font-medium transition-colors">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <FolderOpen size={28} className="text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No projects found</h3>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {searchQuery || filterCategory !== "All" || statusFilter !== "all"
              ? "Try adjusting your filters or search query"
              : "Create your first project to get started"}
          </p>
          <div className="flex items-center gap-3">
            {(searchQuery || filterCategory !== "All" || statusFilter !== "all") && (
              <button
                onClick={() => { setSearchQuery(""); setFilterCategory("All"); setStatusFilter("all"); }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Clear filters
              </button>
            )}
            <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
              <Link href="/admin/projects/new"><Plus size={16} className="mr-1" /> New Project</Link>
            </Button>
          </div>
        </div>
      ) : viewMode === "table" ? (
        <ProjectTable
          projects={paginatedProjects}
          selectedIds={selectedIds}
          onSelect={toggleSelect}
          onSelectAll={toggleSelectAll}
          sortField={sortField}
          sortDir={sortDir}
          onSort={sort}
          onDelete={deleteProject}
          onDuplicate={duplicateProject}
          onArchive={toggleArchive}
          onPublish={togglePublish}
          onFeature={toggleFeatured}
          onPreview={setPreviewProject}
          onSaveVersion={saveVersion}
          onShowVersions={setVersionHistory}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginatedProjects.map((project) => {
            const id = (project._id || project.id) as string;
            return (
              <div key={id} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
                {/* Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all backdrop-blur-md",
                      selectedIds.has(id) ? "bg-cyan-500 border-cyan-500" : "border-white/30 hover:border-white/60 bg-black/20",
                    )}
                    onClick={() => toggleSelect(id)}
                  >
                    {selectedIds.has(id) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </div>
                </div>

                {/* Image */}
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

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{project.category}</span>
                    {project.featured && (
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3 font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 rounded border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] text-gray-600 font-semibold self-center">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-white/[0.04]">
                    <button onClick={() => setPreviewProject(project)} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      Preview
                    </button>
                    <Link href={`/admin/projects/edit/${id}`} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors text-center">
                      Edit
                    </Link>
                    <button onClick={() => duplicateProject(id)} className="py-1.5 px-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                    <button onClick={() => toggleArchive(id)} className="py-1.5 px-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                      <Archive size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-gray-500 font-medium">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/[0.06]"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                    currentPage === page
                      ? "bg-cyan-500 text-white"
                      : "text-gray-500 hover:text-white hover:bg-white/5",
                  )}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/[0.06]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProjectPreviewSheet project={previewProject} onClose={() => setPreviewProject(null)} />
      <VersionHistory project={versionHistory} onClose={() => setVersionHistory(null)} />
      <ConfirmAction
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={confirmAction?.action || (() => Promise.resolve())}
        title={confirmAction?.title || ""}
        description={confirmAction?.description || ""}
        variant={confirmAction?.variant}
      />
    </div>
  );
}
