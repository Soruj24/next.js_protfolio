"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search, X, Loader2, Clock, FolderGit2, FileText, MessageSquare,
  Shield, Settings, BarChart3, GitCommitHorizontal, Rocket, Globe,
  Filter, ExternalLink, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/app/api/timeline/route";

const TYPE_FILTERS: { value: string; label: string; icon: typeof Clock }[] = [
  { value: "all", label: "All", icon: Clock },
  { value: "project", label: "Projects", icon: FolderGit2 },
  { value: "blog", label: "Blogs", icon: FileText },
  { value: "contact", label: "Messages", icon: MessageSquare },
  { value: "github", label: "GitHub", icon: GitCommitHorizontal },
  { value: "security", label: "Security", icon: Shield },
  { value: "deployment", label: "Deployments", icon: Rocket },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
  { value: "system", label: "System", icon: Settings },
];

const TYPE_CONFIG: Record<string, { icon: typeof Clock; color: string; bg: string; dot: string }> = {
  project: { icon: FolderGit2, color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  blog: { icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10", dot: "bg-purple-400" },
  contact: { icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-400/10", dot: "bg-cyan-400" },
  security: { icon: Shield, color: "text-amber-400", bg: "bg-amber-400/10", dot: "bg-amber-400" },
  system: { icon: Settings, color: "text-blue-400", bg: "bg-blue-400/10", dot: "bg-blue-400" },
  analytics: { icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10", dot: "bg-pink-400" },
  github: { icon: GitCommitHorizontal, color: "text-gray-300", bg: "bg-gray-300/10", dot: "bg-gray-400" },
  deployment: { icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10", dot: "bg-orange-400" },
  profile: { icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10", dot: "bg-blue-400" },
};

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
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

function getDateGroup(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This Week";
  if (diffDays < 30) return "This Month";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPage = useCallback(
    async (pageNum: number, append = false) => {
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(pageNum),
          limit: "20",
          type: typeFilter,
          search: debouncedSearch,
        });
        const res = await fetch(`/api/timeline?${params}`);
        if (!res.ok) throw new Error("Failed to load timeline");
        const result = await res.json();

        setItems((prev) => (append ? [...prev, ...result.items] : result.items));
        setTotal(result.total);
        setHasMore(result.hasMore);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [typeFilter, debouncedSearch]
  );

  useEffect(() => {
    setPage(1);
    fetchPage(1, false);
  }, [fetchPage]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPage(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, loadingMore, fetchPage]);

  const grouped = items.reduce<Record<string, TimelineItem[]>>((acc, item) => {
    const group = getDateGroup(item.timestamp);
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  if (error && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Failed to load timeline</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <button onClick={() => fetchPage(1, false)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Activity Timeline</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {total > 0 ? `${total} event${total !== 1 ? "s" : ""} across all sources` : "Loading..."}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            placeholder="Search timeline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500 shrink-0" />
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-x-auto scrollbar-hide">
            {TYPE_FILTERS.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    typeFilter === f.value
                      ? "bg-cyan-500 text-white"
                      : "text-gray-500 hover:text-gray-300",
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

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto pr-2">
        {loading && items.length === 0 ? (
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
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
              <Clock size={24} className="text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-500">
              {search ? "No events match your search" : typeFilter !== "all" ? "No events of this type" : "No activity yet"}
            </p>
            {(search || typeFilter !== "all") && (
              <button
                onClick={() => { setSearch(""); setTypeFilter("all"); }}
                className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group}>
                {/* Date Group Header */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{group}</h3>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[10px] font-bold text-gray-600">{groupItems.length}</span>
                </div>

                {/* Items */}
                <div className="space-y-0 ml-5 border-l border-white/[0.06]">
                  {groupItems.map((item, idx) => {
                    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.system;
                    const Icon = config.icon;
                    const isLast = idx === groupItems.length - 1;

                    return (
                      <div key={item.id} className="relative flex items-start gap-4 pb-6 group">
                        {/* Timeline dot */}
                        <div className={cn("absolute left-[-21px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a12] z-10", config.dot)} />

                        {/* Icon */}
                        <div className={cn("p-2 rounded-xl shrink-0 mt-0.5", config.bg)}>
                          <Icon size={14} className={config.color} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                              {item.description && (
                                <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-2">{item.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">{formatTimestamp(item.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="py-4">
              {loadingMore && (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="text-cyan-400 animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">Loading more...</span>
                </div>
              )}
              {!hasMore && items.length > 0 && (
                <p className="text-center text-[10px] text-gray-600 font-medium">End of timeline</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
