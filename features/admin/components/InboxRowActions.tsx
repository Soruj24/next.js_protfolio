"use client";

import { useState } from "react";
import {
  MoreHorizontal, Eye, EyeOff, CheckCircle2, Archive, ArchiveRestore, Trash2,
} from "lucide-react";
import type { Inquiry } from "@/types/admin";

export default function InboxRowActions({
  inquiry, onStatusChange, onDelete,
}: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
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
