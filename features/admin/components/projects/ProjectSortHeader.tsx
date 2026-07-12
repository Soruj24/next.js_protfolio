"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortField } from "@/features/admin/hooks/useProjectManager";

export default function ProjectSortHeader({
  field, sortField, sortDir, onSort, children, className,
}: {
  field: SortField;
  sortField: SortField;
  sortDir: "asc" | "desc";
  onSort: (field: SortField) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
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
}
