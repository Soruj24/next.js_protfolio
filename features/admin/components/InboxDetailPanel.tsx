"use client";

import {
  X, Eye, EyeOff, CheckCircle2, Archive, ArchiveRestore, Trash2, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import InboxStatusBadge from "@/features/admin/components/InboxStatusBadge";
import { getInitial, getAvatarColor } from "@/features/admin/lib/inbox";
import type { Inquiry } from "@/types/admin";

export default function InboxDetailPanel({
  inquiry, onClose, onStatusChange, onDelete,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="hidden lg:flex w-[45%] min-w-[400px] rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex-col overflow-hidden animate-in slide-in-from-right-4">
      <div className="p-6 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg", getAvatarColor(inquiry.name))}>
              {getInitial(inquiry.name)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{inquiry.name}</h2>
              <a href={`mailto:${inquiry.email}`} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">{inquiry.email}</a>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <InboxStatusBadge status={inquiry.status} />
          <span className="text-[11px] text-gray-600 font-medium">{new Date(inquiry.createdAt).toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1 mt-4">
          {inquiry.status === "pending" && (
            <button onClick={() => onStatusChange(inquiry._id, "read")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-400/10 border border-emerald-400/20 transition-all">
              <Eye size={12} /> Mark Read
            </button>
          )}
          {inquiry.status === "read" && (
            <button onClick={() => onStatusChange(inquiry._id, "pending")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 hover:bg-cyan-400/10 border border-cyan-400/20 transition-all">
              <EyeOff size={12} /> Mark Unread
            </button>
          )}
          {inquiry.status !== "replied" && (
            <button onClick={() => onStatusChange(inquiry._id, "replied")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-purple-400 hover:bg-purple-400/10 border border-purple-400/20 transition-all">
              <CheckCircle2 size={12} /> Mark Replied
            </button>
          )}
          {inquiry.status !== "archived" ? (
            <button onClick={() => onStatusChange(inquiry._id, "archived")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 border border-amber-400/20 transition-all">
              <Archive size={12} /> Archive
            </button>
          ) : (
            <button onClick={() => onStatusChange(inquiry._id, "pending")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-400/10 border border-amber-400/20 transition-all">
              <ArchiveRestore size={12} /> Restore
            </button>
          )}
          <button onClick={() => onDelete(inquiry._id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all ml-auto">
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Subject</h3>
          <p className="text-base font-semibold text-white">{inquiry.subject}</p>
        </div>
        <div>
          <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Message</h3>
          <div className="p-5 rounded-xl bg-black/30 border border-white/[0.06] min-h-[120px]">
            <p className="text-sm text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
          <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            <Mail size={14} /> Reply via email
          </a>
        </div>
      </div>
    </div>
  );
}
