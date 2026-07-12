"use client";

import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { TYPE_FILTERS } from "@/features/admin/data/timeline";

export default function TimelineToolbar({
  search, onSearchChange, typeFilter, onTypeFilterChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          placeholder="Search timeline..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Filter size={14} className="text-gray-500 shrink-0" />
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-x-auto scrollbar-hide">
          {TYPE_FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.value}
                onClick={() => onTypeFilterChange(f.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                  typeFilter === f.value ? "bg-cyan-500 text-white" : "text-gray-500 hover:text-gray-300",
                )}
              >
                <Icon size={12} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
