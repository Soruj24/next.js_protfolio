"use client";

import { useEffect } from "react";
import { X, History, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject, IProjectVersion } from "@/types";

interface VersionHistoryProps {
  project: IProject | null;
  onClose: () => void;
}

export default function VersionHistory({ project, onClose }: VersionHistoryProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  const versions = (project.versions || []).slice().reverse();

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#06060b]/98 backdrop-blur-2xl border-l border-white/[0.08] overflow-y-auto animate-slide-in-right shadow-2xl shadow-black/50">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#06060b]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <History size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-white">Version History</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-400/10 text-purple-400 rounded-full border border-purple-400/20">
              {versions.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {versions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                <History size={20} className="text-gray-600" />
              </div>
              <p className="text-sm text-gray-500 font-medium">No versions saved yet</p>
              <p className="text-xs text-gray-600 mt-1">Save a version from the project actions menu</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-0">
                {versions.map((ver, index) => (
                  <VersionItem key={ver.version} version={ver} isLatest={index === 0} isLast={index === versions.length - 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VersionItem({ version, isLatest, isLast }: { version: IProjectVersion; isLatest: boolean; isLast: boolean }) {
  const snapshot = version.snapshot;
  return (
    <div className={cn("relative flex gap-4 pb-6", isLast && "pb-0")}>
      <div className={cn(
        "relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 border",
        isLatest ? "bg-purple-500/20 border-purple-500/30" : "bg-white/5 border-white/10",
      )}>
        <span className={cn("text-[10px] font-bold", isLatest ? "text-purple-400" : "text-gray-500")}>
          v{version.version}
        </span>
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-center justify-between mb-1">
          <p className={cn("text-sm font-semibold", isLatest ? "text-white" : "text-gray-300")}>{version.label}</p>
          {isLatest && (
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">LATEST</span>
          )}
        </div>
        <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider mb-2">
          {new Date(version.savedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-1.5">
          {snapshot.title && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600 font-medium w-16 shrink-0">Title</span>
              <span className="text-gray-300 font-medium truncate">{snapshot.title}</span>
            </div>
          )}
          {snapshot.category && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600 font-medium w-16 shrink-0">Category</span>
              <span className="text-gray-300 font-medium">{snapshot.category}</span>
            </div>
          )}
          {snapshot.status && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600 font-medium w-16 shrink-0">Status</span>
              <span className="text-gray-300 font-medium">{snapshot.status}</span>
            </div>
          )}
          {snapshot.technologies && snapshot.technologies.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600 font-medium w-16 shrink-0">Tech</span>
              <span className="text-gray-300 font-medium">{snapshot.technologies.slice(0, 3).join(", ")}{snapshot.technologies.length > 3 ? ` +${snapshot.technologies.length - 3}` : ""}</span>
            </div>
          )}
        </div>
        <button className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-gray-500 hover:text-purple-400 transition-colors">
          <RotateCcw size={11} /> Restore this version
        </button>
      </div>
    </div>
  );
}
