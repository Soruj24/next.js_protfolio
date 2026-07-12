"use client";

import { AlertTriangle, Clock, Loader2 } from "lucide-react";

export function TimelineErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
        <AlertTriangle size={24} className="text-red-400" />
      </div>
      <h2 className="text-lg font-bold text-white mb-2">Failed to load timeline</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
      <button onClick={onRetry} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
        Try again
      </button>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-white/5 shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-4 w-48 bg-white/5 rounded-lg" />
            <div className="h-3 w-72 bg-white/[0.03] rounded-lg" />
            <div className="h-2 w-16 bg-white/[0.02] rounded-lg mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TimelineEmptyState({
  hasActiveFilters, onClearFilters,
}: {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
        <Clock size={24} className="text-gray-600" />
      </div>
      <p className="text-sm font-medium text-gray-500">
        {hasActiveFilters ? "No events match your search" : "No activity yet"}
      </p>
      {hasActiveFilters && (
        <button onClick={onClearFilters} className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium">
          Clear filters
        </button>
      )}
    </div>
  );
}

export function TimelineSentinel({ loadingMore, hasMore }: { loadingMore: boolean; hasMore: boolean }) {
  return (
    <div className="py-4">
      {loadingMore && (
        <div className="flex items-center justify-center gap-2">
          <Loader2 size={16} className="text-cyan-400 animate-spin" />
          <span className="text-xs text-gray-500 font-medium">Loading more...</span>
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-[10px] text-gray-600 font-medium">End of timeline</p>
      )}
    </div>
  );
}
