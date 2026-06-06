"use client";
import Link from "next/link";
import { Plus, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/admin/useProjects";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import AdminCategoryFilter from "@/components/admin/AdminCategoryFilter";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminProjectCard from "@/components/admin/project/AdminProjectCard";
import ProfessionalPagination from "@/components/admin/Pagination";

export default function AdminProjects() {
  const {
    loading, searchQuery, setSearchQuery,
    filterCategory, setFilterCategory, categories,
    currentPage, setCurrentPage, totalPages,
    paginatedProjects, handleDelete, ITEMS_PER_PAGE,
  } = useProjects();

  if (loading) return <div className="text-white">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Project Portfolio</h1>
          <p className="text-gray-400 font-medium">Manage and deploy your technical projects</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
          <Link href="/admin/projects/new">
            <Plus className="mr-2" size={20} />
            Add New Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <AdminSearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search projects by title or description..." />
        <AdminCategoryFilter categories={categories} selected={filterCategory} onSelect={setFilterCategory} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProjects.map((project) => (
          <AdminProjectCard key={project._id || project.id} project={project} onDelete={handleDelete} />
        ))}
      </div>

      <ProfessionalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={paginatedProjects.length}
        itemsPerPage={ITEMS_PER_PAGE}
        color="cyan"
      />

      {paginatedProjects.length === 0 && (
        <AdminEmptyState
          icon={<SearchIcon className="text-gray-600" size={32} />}
          title="No projects found"
          description="Try adjusting your search query or filter to find what you're looking for."
          actionLabel="Clear All Filters"
          onAction={() => { setSearchQuery(""); setFilterCategory("All"); }}
        />
      )}
    </div>
  );
}
