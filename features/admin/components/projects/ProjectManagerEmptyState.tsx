"use client";

import Link from "next/link";
import { Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectManagerEmptyState({
  hasActiveFilters, onClearFilters,
}: {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <FolderOpen size={28} className="text-gray-600" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">No projects found</h3>
      <p className="text-sm text-gray-500 font-medium mb-6">
        {hasActiveFilters ? "Try adjusting your filters or search query" : "Create your first project to get started"}
      </p>
      <div className="flex items-center gap-3">
        {hasActiveFilters && (
          <button onClick={onClearFilters} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            Clear filters
          </button>
        )}
        <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
          <Link href="/admin/projects/new"><Plus size={16} className="mr-1" /> New Project</Link>
        </Button>
      </div>
    </div>
  );
}
