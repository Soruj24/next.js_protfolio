"use client";

import { Search, Filter, LayoutGrid, LayoutList, Eye, Star, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_FILTERS } from "@/features/admin/data/projects";
import type { StatusFilter } from "@/features/admin/hooks/useProjectManager";

export default function ProjectManagerToolbar({
  searchQuery, onSearchChange,
  categories, filterCategory, onCategoryChange,
  statusFilter, onStatusFilterChange,
  viewMode, onViewModeChange,
  selectedIds, onBulkPublish, onBulkFeature, onBulkArchive, onBulkDelete, onClearSelection,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  categories: string[];
  filterCategory: string;
  onCategoryChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: StatusFilter) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (v: "table" | "grid") => void;
  selectedIds: Set<string>;
  onBulkPublish: () => void;
  onBulkFeature: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/30 focus:bg-white/[0.06] transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
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

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
            className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-300 font-medium outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
          >
            {STATUS_FILTERS.map((sf) => (
              <option key={sf.value} value={sf.value}>{sf.label}</option>
            ))}
          </select>
          <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          <button
            onClick={() => onViewModeChange("table")}
            className={cn("p-2 rounded-md transition-all", viewMode === "table" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500 hover:text-gray-300")}
          >
            <LayoutList size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn("p-2 rounded-md transition-all", viewMode === "grid" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500 hover:text-gray-300")}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.06] animate-fade-in">
          <span className="text-xs font-semibold text-cyan-400">{selectedIds.size} selected</span>
          <div className="flex items-center gap-2">
            <button onClick={onBulkPublish} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-colors">
              <Eye size={12} /> Publish
            </button>
            <button onClick={onBulkFeature} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-colors">
              <Star size={12} /> Feature
            </button>
            <button onClick={onBulkArchive} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Archive size={12} /> Archive
            </button>
            <button onClick={onBulkDelete} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-colors">
              <Trash2 size={12} /> Delete
            </button>
          </div>
          <button onClick={onClearSelection} className="ml-auto text-xs text-gray-500 hover:text-gray-300 font-medium transition-colors">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
