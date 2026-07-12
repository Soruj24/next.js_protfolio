"use client";

import { Eye, EyeOff, Archive, Trash2, X } from "lucide-react";

export default function InboxBulkActions({
  count, actionLoading, onMarkRead, onMarkUnread, onArchive, onDelete, onClear,
}: {
  count: number;
  actionLoading: boolean;
  onMarkRead: () => void;
  onMarkUnread: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 animate-in slide-in-from-top-2">
      <span className="text-xs font-bold text-cyan-400">{count} selected</span>
      <div className="flex items-center gap-1 ml-auto">
        <button onClick={onMarkRead} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-400/10 transition-all disabled:opacity-50">
          <Eye size={12} /> Mark Read
        </button>
        <button onClick={onMarkUnread} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 hover:bg-cyan-400/10 transition-all disabled:opacity-50">
          <EyeOff size={12} /> Mark Unread
        </button>
        <button onClick={onArchive} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 transition-all disabled:opacity-50">
          <Archive size={12} /> Archive
        </button>
        <button onClick={onDelete} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50">
          <Trash2 size={12} /> Delete
        </button>
      </div>
      <button onClick={onClear} className="text-gray-500 hover:text-white ml-2">
        <X size={14} />
      </button>
    </div>
  );
}
