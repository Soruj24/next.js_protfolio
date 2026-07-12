"use client";

import { Mail, Loader2, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_BADGES } from "@/features/admin/data/inbox";
import { formatDate, getInitial, getAvatarColor } from "@/features/admin/lib/inbox";
import InboxRowActions from "@/features/admin/components/InboxRowActions";
import type { Inquiry, InboxResponse } from "@/types/admin";

export default function InboxTable({
  data, loading, page, selectedIds, selectedInquiry,
  search, statusFilter,
  onSelectInquiry, onToggleSelect, onToggleSelectAll, onPageChange,
  onStatusChange, onDelete, onClearSearch,
}: {
  data: InboxResponse | null;
  loading: boolean;
  page: number;
  selectedIds: Set<string>;
  selectedInquiry: Inquiry | null;
  search: string;
  statusFilter: string;
  onSelectInquiry: (inq: Inquiry) => void;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onPageChange: (page: number) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onClearSearch: () => void;
}) {
  const allSelected = data && data.data.length > 0 && data.data.every((d) => selectedIds.has(d._id));

  return (
    <div className={cn(
      "flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300",
      selectedInquiry ? "lg:max-w-[55%]" : "",
    )}>
      <div className="flex-1 overflow-y-auto">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Loader2 size={24} className="text-cyan-400 animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Loading messages...</p>
          </div>
        ) : data && data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
              <Mail size={24} className="text-gray-600" />
            </div>
              <p className="text-sm font-medium text-gray-500">
                  {search ? "No messages match your search" : statusFilter !== "all" ? "No messages with this status" : "No messages yet"}
                </p>
                {search && (
                  <button onClick={onClearSearch} className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                    Clear search
                  </button>
                )}
          </div>
        ) : data ? (
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/[0.06]">
              <tr>
                <th className="w-12 px-4 py-3">
                  <button onClick={onToggleSelectAll} className="flex items-center justify-center">
                    {allSelected ? <CheckCircle2 size={16} className="text-cyan-400" /> : <Circle size={16} className="text-gray-600 hover:text-gray-400" />}
                  </button>
                </th>
                <th className="w-3 px-2 py-3" />
                <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">From</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Subject</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Message</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-24">Date</th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {data.data.map((inq) => {
                const isSelected = selectedIds.has(inq._id);
                const isActive = selectedInquiry?._id === inq._id;
                const isUnread = inq.status === "pending";

                return (
                  <tr
                    key={inq._id}
                    onClick={() => onSelectInquiry(inq)}
                    className={cn(
                      "cursor-pointer transition-all duration-150 group",
                      isActive ? "bg-cyan-500/10" : "hover:bg-white/[0.03]",
                      isUnread && "bg-white/[0.02]",
                    )}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => onToggleSelect(inq._id)} className="flex items-center justify-center">
                        {isSelected ? <CheckCircle2 size={16} className="text-cyan-400" /> : <Circle size={16} className="text-gray-600 group-hover:text-gray-400" />}
                      </button>
                    </td>
                    <td className="px-2 py-3">
                      <div className={cn("w-2 h-2 rounded-full", isUnread ? "bg-cyan-400" : "bg-transparent")} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0", getAvatarColor(inq.name))}>
                          {getInitial(inq.name)}
                        </div>
                        <div className="min-w-0">
                          <p className={cn("text-sm truncate", isUnread ? "font-bold text-white" : "font-medium text-gray-300")}>{inq.name}</p>
                          <p className="text-[11px] text-gray-600 truncate">{inq.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className={cn("text-sm truncate max-w-[200px]", isUnread ? "font-semibold text-white" : "text-gray-400")}>{inq.subject}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-xs text-gray-600 truncate max-w-[250px]">{inq.message}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{formatDate(inq.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <InboxRowActions inquiry={inq} onStatusChange={onStatusChange} onDelete={onDelete} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]">
          <p className="text-xs text-gray-600 font-medium">
            Showing {((page - 1) * data.limit) + 1}–{Math.min(page * data.limit, data.total)} of {data.total}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === data.totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | string)[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                typeof p === "string" ? (
                  <span key={`dots-${i}`} className="px-1 text-gray-600 text-xs">...</span>
                ) : (
                  <button key={p} onClick={() => onPageChange(p)} className={cn("w-8 h-8 rounded-lg text-xs font-bold transition-all", page === p ? "bg-cyan-500 text-white" : "text-gray-500 hover:text-white hover:bg-white/5")}>{p}</button>
                )
              )}
            <button onClick={() => onPageChange(Math.min(data.totalPages, page + 1))} disabled={page === data.totalPages} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
