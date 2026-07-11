"use client";

import { useState, useMemo } from "react";
import {
  Mail, Search, Trash2, Archive, ArchiveRestore, Eye, EyeOff,
  ChevronLeft, ChevronRight, X, User, Clock, AlertTriangle,
  MoreHorizontal, CheckCircle2, Circle, Filter, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInbox, type StatusFilter } from "@/features/admin/hooks/useInbox";
import type { Inquiry } from "@/types/admin";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Messages" },
  { value: "pending", label: "Unread" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
];

const STATUS_BADGES: Record<string, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-cyan-400/10", text: "text-cyan-400", dot: "bg-cyan-400" },
  read: { bg: "bg-emerald-400/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  replied: { bg: "bg-purple-400/10", text: "text-purple-400", dot: "bg-purple-400" },
  archived: { bg: "bg-gray-400/10", text: "text-gray-400", dot: "bg-gray-400" },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
}

function getInitial(name: string): string {
  return name?.charAt(0)?.toUpperCase() || "?";
}

const STATUS_COLORS_AVATAR = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-red-600",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return STATUS_COLORS_AVATAR[Math.abs(hash) % STATUS_COLORS_AVATAR.length];
}

// ─── Main Component ─────────────────────────────────────────────

export default function InboxPage() {
  const {
    data, loading, error, page, setPage, search, setSearch,
    statusFilter, setStatusFilter, selectedIds, selectedInquiry,
    setSelectedInquiry, actionLoading, fetchData, updateStatus,
    bulkUpdateStatus, bulkDelete, deleteMessage, toggleSelect,
    toggleSelectAll, clearSelection,
  } = useInbox();

  const [showDetail, setShowDetail] = useState(false);

  const allSelected = useMemo(() => {
    if (!data || data.data.length === 0) return false;
    return data.data.every((d) => selectedIds.has(d._id));
  }, [data, selectedIds]);

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setShowDetail(true);
    if (inq.status === "pending") {
      updateStatus(inq._id, "read");
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedInquiry(null);
  };

  // ── Error State ──
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Failed to load messages</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Mail size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Inbox</h1>
            <p className="text-xs text-gray-500 font-medium">
              {data ? `${data.total} message${data.total !== 1 ? "s" : ""}` : "Loading..."}
              {data && data.unreadCount > 0 && (
                <span className="ml-2 text-cyan-400">{data.unreadCount} unread</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                  statusFilter === opt.value
                    ? "bg-cyan-500 text-white"
                    : "text-gray-500 hover:text-gray-300",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bulk Actions ── */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 animate-in slide-in-from-top-2">
          <span className="text-xs font-bold text-cyan-400">{selectedIds.size} selected</span>
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => bulkUpdateStatus("read")}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-400/10 transition-all disabled:opacity-50"
            >
              <Eye size={12} /> Mark Read
            </button>
            <button
              onClick={() => bulkUpdateStatus("pending")}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 hover:bg-cyan-400/10 transition-all disabled:opacity-50"
            >
              <EyeOff size={12} /> Mark Unread
            </button>
            <button
              onClick={() => bulkUpdateStatus("archived")}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 transition-all disabled:opacity-50"
            >
              <Archive size={12} /> Archive
            </button>
            <button
              onClick={bulkDelete}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
          <button onClick={clearSelection} className="text-gray-500 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Table + Detail Layout ── */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* ── Data Table ── */}
        <div className={cn(
          "flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300",
          showDetail && selectedInquiry ? "lg:max-w-[55%]" : "",
        )}>
          {/* Table */}
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
                  <button onClick={() => setSearch("")} className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                    Clear search
                  </button>
                )}
              </div>
            ) : data ? (
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/[0.06]">
                  <tr>
                    <th className="w-12 px-4 py-3">
                      <button onClick={toggleSelectAll} className="flex items-center justify-center">
                        {allSelected ? (
                          <CheckCircle2 size={16} className="text-cyan-400" />
                        ) : (
                          <Circle size={16} className="text-gray-600 hover:text-gray-400" />
                        )}
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
                    const badge = STATUS_BADGES[inq.status] || STATUS_BADGES.pending;

                    return (
                      <tr
                        key={inq._id}
                        onClick={() => handleSelectInquiry(inq)}
                        className={cn(
                          "cursor-pointer transition-all duration-150 group",
                          isActive
                            ? "bg-cyan-500/10"
                            : "hover:bg-white/[0.03]",
                          isUnread && "bg-white/[0.02]",
                        )}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => toggleSelect(inq._id)} className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 size={16} className="text-cyan-400" />
                            ) : (
                              <Circle size={16} className="text-gray-600 group-hover:text-gray-400" />
                            )}
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
                              <p className={cn("text-sm truncate", isUnread ? "font-bold text-white" : "font-medium text-gray-300")}>
                                {inq.name}
                              </p>
                              <p className="text-[11px] text-gray-600 truncate">{inq.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className={cn("text-sm truncate max-w-[200px]", isUnread ? "font-semibold text-white" : "text-gray-400")}>
                            {inq.subject}
                          </p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-xs text-gray-600 truncate max-w-[250px]">{inq.message}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{formatDate(inq.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <RowActions
                            inquiry={inq}
                            onStatusChange={updateStatus}
                            onDelete={deleteMessage}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>

          {/* ── Pagination ── */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]">
              <p className="text-xs text-gray-600 font-medium">
                Showing {((page - 1) * data.limit) + 1}–{Math.min(page * data.limit, data.total)} of {data.total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all"
                >
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
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                          page === p ? "bg-cyan-500 text-white" : "text-gray-500 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Detail Panel ── */}
        {showDetail && selectedInquiry && (
          <div className="hidden lg:flex w-[45%] min-w-[400px] rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex-col overflow-hidden animate-in slide-in-from-right-4">
            {/* Detail Header */}
            <div className="p-6 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg", getAvatarColor(selectedInquiry.name))}>
                    {getInitial(selectedInquiry.name)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedInquiry.name}</h2>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>
                <button onClick={handleCloseDetail} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={selectedInquiry.status} />
                <span className="text-[11px] text-gray-600 font-medium">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Detail Actions */}
              <div className="flex items-center gap-1 mt-4">
                {selectedInquiry.status === "pending" && (
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, "read")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-400/10 border border-emerald-400/20 transition-all"
                  >
                    <Eye size={12} /> Mark Read
                  </button>
                )}
                {selectedInquiry.status === "read" && (
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, "pending")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 hover:bg-cyan-400/10 border border-cyan-400/20 transition-all"
                  >
                    <EyeOff size={12} /> Mark Unread
                  </button>
                )}
                {selectedInquiry.status !== "replied" && (
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, "replied")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-purple-400 hover:bg-purple-400/10 border border-purple-400/20 transition-all"
                  >
                    <CheckCircle2 size={12} /> Mark Replied
                  </button>
                )}
                {selectedInquiry.status !== "archived" ? (
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, "archived")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 border border-amber-400/20 transition-all"
                  >
                    <Archive size={12} /> Archive
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, "pending")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 border border-amber-400/20 transition-all"
                  >
                    <ArchiveRestore size={12} /> Restore
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedInquiry._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all ml-auto"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>

            {/* Detail Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Subject</h3>
                <p className="text-base font-semibold text-white">{selectedInquiry.subject}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Message</h3>
                <div className="p-5 rounded-xl bg-black/30 border border-white/[0.06] min-h-[120px]">
                  <p className="text-sm text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                  className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  <Mail size={14} /> Reply via email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-Components ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const badge = STATUS_BADGES[status] || STATUS_BADGES.pending;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", badge.bg, badge.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", badge.dot)} />
      {status}
    </span>
  );
}

function RowActions({ inquiry, onStatusChange, onDelete }: { inquiry: Inquiry; onStatusChange: (id: string, status: string) => void; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
      >
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-xl border border-white/[0.1] bg-[#0f0f1a]/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-1 overflow-hidden">
            {inquiry.status !== "read" && (
              <button onClick={() => { onStatusChange(inquiry._id, "read"); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                <Eye size={12} className="text-emerald-400" /> Mark as Read
              </button>
            )}
            {inquiry.status !== "pending" && (
              <button onClick={() => { onStatusChange(inquiry._id, "pending"); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                <EyeOff size={12} className="text-cyan-400" /> Mark as Unread
              </button>
            )}
            {inquiry.status !== "replied" && (
              <button onClick={() => { onStatusChange(inquiry._id, "replied"); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                <CheckCircle2 size={12} className="text-purple-400" /> Mark as Replied
              </button>
            )}
            {inquiry.status !== "archived" ? (
              <button onClick={() => { onStatusChange(inquiry._id, "archived"); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                <Archive size={12} className="text-amber-400" /> Archive
              </button>
            ) : (
              <button onClick={() => { onStatusChange(inquiry._id, "pending"); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                <ArchiveRestore size={12} className="text-amber-400" /> Restore
              </button>
            )}
            <div className="my-1 border-t border-white/[0.06]" />
            <button onClick={() => { onDelete(inquiry._id); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-400/5 transition-colors">
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
