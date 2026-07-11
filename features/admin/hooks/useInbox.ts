"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { Inquiry, InboxResponse } from "@/types/admin";

export type StatusFilter = "all" | "pending" | "read" | "replied" | "archived";

export function useInbox() {
  const [data, setData] = useState<InboxResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        status: statusFilter,
      });
      const res = await fetch(`/api/contact?${params}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const result: InboxResponse = await res.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const updateStatus = useCallback(async (id: string, status: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(`Marked as ${status}`);
      fetchData();
      if (selectedInquiry?._id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: status as Inquiry["status"] } : null));
      }
    } catch {
      toast.error("Failed to update message");
    }
  }, [fetchData, selectedInquiry]);

  const bulkUpdateStatus = useCallback(async (status: string) => {
    if (selectedIds.size === 0) return;
    setActionLoading(true);
    try {
      const ids = Array.from(selectedIds);
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(`${ids.length} messages marked as ${status}`);
      setSelectedIds(new Set());
      fetchData();
    } catch {
      toast.error("Failed to update messages");
    } finally {
      setActionLoading(false);
    }
  }, [selectedIds, fetchData]);

  const bulkDelete = useCallback(async () => {
    if (selectedIds.size === 0) return;
    setActionLoading(true);
    try {
      const ids = Array.from(selectedIds);
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success(`${ids.length} messages deleted`);
      setSelectedIds(new Set());
      if (selectedInquiry && ids.includes(selectedInquiry._id)) {
        setSelectedInquiry(null);
      }
      fetchData();
    } catch {
      toast.error("Failed to delete messages");
    } finally {
      setActionLoading(false);
    }
  }, [selectedIds, fetchData, selectedInquiry]);

  const deleteMessage = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Message deleted");
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
      fetchData();
    } catch {
      toast.error("Failed to delete message");
    }
  }, [fetchData, selectedInquiry]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (!data) return;
    setSelectedIds((prev) => {
      const allIds = data.data.map((d) => d._id);
      const allSelected = allIds.every((id) => prev.has(id));
      if (allSelected) return new Set();
      return new Set(allIds);
    });
  }, [data]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedIds,
    selectedInquiry,
    setSelectedInquiry,
    actionLoading,
    fetchData,
    updateStatus,
    bulkUpdateStatus,
    bulkDelete,
    deleteMessage,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
  };
}
