"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectManager } from "@/features/admin/hooks/useProjectManager";
import ProjectTable from "./ProjectTable";
import ProjectPreviewSheet from "./ProjectPreviewSheet";
import VersionHistory from "./VersionHistory";
import ConfirmAction from "./ConfirmAction";
import ProjectManagerSkeleton from "./ProjectManagerSkeleton";
import ProjectManagerToolbar from "./ProjectManagerToolbar";
import ProjectManagerEmptyState from "./ProjectManagerEmptyState";
import ProjectGridCard from "./ProjectGridCard";
import ProjectPagination from "./ProjectPagination";

export default function ProjectManager() {
  const {
    loading,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedProjects,
    filteredProjects,
    ITEMS_PER_PAGE,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    sortField,
    sortDir,
    sort,
    viewMode,
    setViewMode,
    previewProject,
    setPreviewProject,
    confirmAction,
    setConfirmAction,
    versionHistory,
    setVersionHistory,
    categories,
    deleteProject,
    duplicateProject,
    toggleArchive,
    togglePublish,
    toggleFeatured,
    saveVersion,
    bulkDelete,
    bulkArchive,
    bulkPublish,
    bulkFeature,
  } = useProjectManager();

  if (loading) return <ProjectManagerSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-5 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <Link href="/admin/projects/new">
            <Plus className="mr-2" size={18} />
            New Project
          </Link>
        </Button>
      </div>

      <ProjectManagerToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedIds={selectedIds}
        onBulkPublish={bulkPublish}
        onBulkFeature={bulkFeature}
        onBulkArchive={bulkArchive}
        onBulkDelete={bulkDelete}
        onClearSelection={clearSelection}
      />

      {filteredProjects.length === 0 ? (
        <ProjectManagerEmptyState
          hasActiveFilters={
            !!(
              searchQuery ||
              filterCategory !== "All" ||
              statusFilter !== "all"
            )
          }
          onClearFilters={() => {
            setSearchQuery("");
            setFilterCategory("All");
            setStatusFilter("all");
          }}
        />
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
              <ProjectGridCard
                key={id}
                project={project}
                isSelected={selectedIds.has(id)}
                onToggleSelect={toggleSelect}
                onPreview={setPreviewProject}
                onDuplicate={duplicateProject}
                onArchive={toggleArchive}
              />
            );
          })}
        </div>
      )}

      <ProjectPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemCount={filteredProjects.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <ProjectPreviewSheet
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
      <VersionHistory
        project={versionHistory}
        onClose={() => setVersionHistory(null)}
      />
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
