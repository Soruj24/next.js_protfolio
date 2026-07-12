"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getDateGroup } from "@/features/admin/lib/timeline";
import TimelineToolbar from "./TimelineToolbar";
import TimelineDateGroup from "./TimelineDateGroup";
import { TimelineErrorState, TimelineSkeleton, TimelineEmptyState, TimelineSentinel } from "./TimelineStates";
import type { TimelineItem } from "@/app/api/timeline/route";

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
        const params = new URLSearchParams({ page: String(pageNum), limit: "20", type: typeFilter, search: debouncedSearch });
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
    return <TimelineErrorState error={error} onRetry={() => fetchPage(1, false)} />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Activity Timeline</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {total > 0 ? `${total} event${total !== 1 ? "s" : ""} across all sources` : "Loading..."}
          </p>
        </div>
      </div>

      <TimelineToolbar search={search} onSearchChange={setSearch} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} />

      <div className="flex-1 overflow-y-auto pr-2">
        {loading && items.length === 0 ? (
          <TimelineSkeleton />
        ) : items.length === 0 ? (
          <TimelineEmptyState
            hasActiveFilters={!!(search || typeFilter !== "all")}
            onClearFilters={() => { setSearch(""); setTypeFilter("all"); }}
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([group, groupItems]) => (
              <TimelineDateGroup key={group} group={group} items={groupItems} />
            ))}
            <div ref={sentinelRef}>
              <TimelineSentinel loadingMore={loadingMore} hasMore={hasMore} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
