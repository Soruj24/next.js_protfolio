"use client";
import Link from "next/link";
import { Plus, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSkills } from "@/features/admin/hooks/useSkills";
import AdminSearchBar from "@/features/admin/components/AdminSearchBar";
import AdminEmptyState from "@/features/admin/components/AdminEmptyState";
import SkillCategoryCard from "@/features/admin/components/SkillCategoryCard";
import ProfessionalPagination from "@/features/admin/components/Pagination";

export default function AdminSkills() {
  const {
    loading, searchQuery, setSearchQuery,
    currentPage, setCurrentPage, totalPages,
    paginatedCategories, handleDelete, ITEMS_PER_PAGE,
  } = useSkills();

  if (loading) return <div className="text-white">Loading skills...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Technical Skills</h1>
          <p className="text-gray-400 font-medium">Manage your technical expertise categories</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105">
          <Link href="/admin/skills/new">
            <Plus className="mr-2" size={20} />
            Add New Category
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <AdminSearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search categories or specific skills..." accentColor="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedCategories.map((category) => (
          <SkillCategoryCard key={category._id} category={category} onDelete={handleDelete} />
        ))}
      </div>

      <ProfessionalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={paginatedCategories.length}
        itemsPerPage={ITEMS_PER_PAGE}
        color="purple"
      />

      {paginatedCategories.length === 0 && (
        <AdminEmptyState
          icon={<SearchIcon className="text-gray-600" size={32} />}
          title="No categories found"
          description="Try searching for a different category or skill name."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery("")}
          accentColor="purple"
        />
      )}
    </div>
  );
}
