"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import type { IProject } from "@/types";

const ITEMS_PER_PAGE = 10;

export type SortField = "title" | "category" | "status" | "createdAt" | "updatedAt" | "order";
type SortDir = "asc" | "desc";
type ViewMode = "grid" | "table";
export type StatusFilter = "all" | "published" | "draft" | "archived" | "featured";

interface UndoAction {
  id: string;
  label: string;
  undo: () => Promise<void>;
}

export function useProjectManager() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [previewProject, setPreviewProject] = useState<IProject | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    description: string;
    action: () => Promise<void>;
    variant?: "danger" | "warning" | "info";
  } | null>(null);
  const [versionHistory, setVersionHistory] = useState<IProject | null>(null);

  const undoStackRef = useRef<UndoAction[]>([]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // Filtered & sorted
  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = filterCategory === "All" || p.category === filterCategory;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && p.published !== false && !p.archived) ||
        (statusFilter === "draft" && p.published === false) ||
        (statusFilter === "archived" && p.archived) ||
        (statusFilter === "featured" && p.featured);
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      switch (sortField) {
        case "title": aVal = a.title; bVal = b.title; break;
        case "category": aVal = a.category; bVal = b.category; break;
        case "status": aVal = a.status; bVal = b.status; break;
        case "createdAt": aVal = new Date(a.createdAt).getTime(); bVal = new Date(b.createdAt).getTime(); break;
        case "updatedAt": aVal = new Date(a.updatedAt).getTime(); bVal = new Date(b.updatedAt).getTime(); break;
        case "order": aVal = a.order ?? 0; bVal = b.order ?? 0; break;
        default: aVal = 0; bVal = 0;
      }
      if (typeof aVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [searchQuery, filterCategory, statusFilter]);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Selection
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === paginatedProjects.length) return new Set();
      return new Set(paginatedProjects.map((p) => (p._id || p.id) as string));
    });
  }, [paginatedProjects]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // Undo system
  const pushUndo = useCallback((action: UndoAction) => {
    undoStackRef.current = [action, ...undoStackRef.current].slice(0, 10);
    toast.info(action.label, {
      action: {
        label: "Undo",
        onClick: async () => {
          await action.undo();
          toast.success("Undone");
          fetchProjects();
        },
      },
      duration: 8000,
    });
  }, [fetchProjects]);

  // Single project actions
  const deleteProject = useCallback(async (id: string) => {
    const project = projects.find((p) => (p._id || p.id) === id);
    setConfirmAction({
      title: "Delete project",
      description: `Are you sure you want to delete "${project?.title}"? This action cannot be undone.`,
      variant: "danger",
      action: async () => {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          pushUndo({
            id,
            label: `Deleted "${project?.title}"`,
            undo: async () => {
              if (project) {
                const { _id, ...data } = project;
                await fetch(`/api/projects`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
              }
            },
          });
          fetchProjects();
          setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
        } else {
          toast.error("Failed to delete project");
        }
      },
    });
  }, [projects, fetchProjects, pushUndo]);

  const duplicateProject = useCallback(async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate" }),
    });
    if (res.ok) {
      toast.success("Project duplicated");
      fetchProjects();
    } else {
      toast.error("Failed to duplicate project");
    }
  }, [fetchProjects]);

  const toggleArchive = useCallback(async (id: string) => {
    const project = projects.find((p) => (p._id || p.id) === id);
    const newArchived = !project?.archived;
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "archive", data: { archived: newArchived } }),
    });
    pushUndo({
      id,
      label: newArchived ? `Archived "${project?.title}"` : `Unarchived "${project?.title}"`,
      undo: async () => {
        await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "archive", data: { archived: !newArchived } }),
        });
      },
    });
    fetchProjects();
  }, [projects, fetchProjects, pushUndo]);

  const togglePublish = useCallback(async (id: string) => {
    const project = projects.find((p) => (p._id || p.id) === id);
    const newPublished = project?.published === false;
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "publish", data: { published: newPublished } }),
    });
    pushUndo({
      id,
      label: newPublished ? `Published "${project?.title}"` : `Unpublished "${project?.title}"`,
      undo: async () => {
        await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "publish", data: { published: !newPublished } }),
        });
      },
    });
    fetchProjects();
  }, [projects, fetchProjects, pushUndo]);

  const toggleFeatured = useCallback(async (id: string) => {
    const project = projects.find((p) => (p._id || p.id) === id);
    const newFeatured = !project?.featured;
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "feature", data: { featured: newFeatured } }),
    });
    fetchProjects();
  }, [projects, fetchProjects]);

  const saveVersion = useCallback(async (id: string, label?: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save-version", data: { label } }),
    });
    if (res.ok) {
      toast.success("Version saved");
      fetchProjects();
    }
  }, [fetchProjects]);

  // Bulk actions
  const bulkDelete = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setConfirmAction({
      title: `Delete ${ids.length} project${ids.length > 1 ? "s" : ""}`,
      description: `Are you sure you want to delete ${ids.length} project${ids.length > 1 ? "s" : ""}? This action cannot be undone.`,
      variant: "danger",
      action: async () => {
        const res = await fetch("/api/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "bulk-delete", ids }),
        });
        if (res.ok) {
          toast.success(`${ids.length} project${ids.length > 1 ? "s" : ""} deleted`);
          clearSelection();
          fetchProjects();
        }
      },
    });
  }, [selectedIds, clearSelection, fetchProjects]);

  const bulkArchive = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk-archive", ids, data: { archived: true } }),
    });
    toast.success(`${ids.length} project${ids.length > 1 ? "s" : ""} archived`);
    clearSelection();
    fetchProjects();
  }, [selectedIds, clearSelection, fetchProjects]);

  const bulkPublish = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk-publish", ids, data: { published: true } }),
    });
    toast.success(`${ids.length} project${ids.length > 1 ? "s" : ""} published`);
    clearSelection();
    fetchProjects();
  }, [selectedIds, clearSelection, fetchProjects]);

  const bulkFeature = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk-feature", ids, data: { featured: true } }),
    });
    toast.success(`${ids.length} project${ids.length > 1 ? "s" : ""} featured`);
    clearSelection();
    fetchProjects();
  }, [selectedIds, clearSelection, fetchProjects]);

  const sort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return prev;
      }
      setSortDir("asc");
      return field;
    });
  }, []);

  return {
    projects, loading, filteredProjects,
    searchQuery, setSearchQuery,
    filterCategory, setFilterCategory,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages,
    paginatedProjects, ITEMS_PER_PAGE,
    selectedIds, toggleSelect, toggleSelectAll, clearSelection,
    sortField, sortDir, sort,
    viewMode, setViewMode,
    previewProject, setPreviewProject,
    confirmAction, setConfirmAction,
    versionHistory, setVersionHistory,
    categories,
    deleteProject, duplicateProject, toggleArchive, togglePublish, toggleFeatured, saveVersion,
    bulkDelete, bulkArchive, bulkPublish, bulkFeature,
    fetchProjects,
  };
}
