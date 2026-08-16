"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  GripVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Circle,
  RefreshCw,
  Copy,
  LinkIcon,
  Activity,
} from "lucide-react";
import type { LinkData, LinkType, LinkCategory, LinkHealthSummary } from "@/lib/links/link-types";
import { LINK_TYPE_LABELS, LINK_CATEGORY_LABELS } from "@/lib/links/link-types";
import LinkForm from "./LinkForm";

export default function LinksManager() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkData | null>(null);
  const [healthSummary, setHealthSummary] = useState<LinkHealthSummary | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHealthSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/links?active=true");
      if (res.ok) {
        const data: LinkData[] = await res.json();
        const total = data.length;
        const active = data.filter((l) => l.isActive).length;
        const broken = data.filter((l) => l.health?.status === "broken").length;
        const redirect = data.filter((l) => l.health?.status === "redirect").length;
        const unchecked = data.filter((l) => !l.health || l.health.status === "unchecked").length;
        const responseTimes = data.filter((l) => l.health?.responseTime != null).map((l) => l.health!.responseTime!);
        const avgResponseTime = responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : null;
        const checkedLinks = data.filter((l) => l.health?.lastCheckedAt);
        const lastCheckedAt = checkedLinks.length > 0
          ? checkedLinks.sort((a, b) => new Date(b.health!.lastCheckedAt!).getTime() - new Date(a.health!.lastCheckedAt!).getTime())[0].health!.lastCheckedAt
          : null;
        setHealthSummary({ total, active, broken, redirect, unchecked, lastCheckedAt: lastCheckedAt as string | null, avgResponseTime });
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchLinks();
    fetchHealthSummary();
  }, [fetchLinks, fetchHealthSummary]);

  useEffect(() => {
    let result = [...links];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.label.toLowerCase().includes(q) ||
          l.url.toLowerCase().includes(q) ||
          l.type.toLowerCase().includes(q)
      );
    }

    if (filterCategory !== "all") {
      result = result.filter((l) => l.category === filterCategory);
    }

    if (filterType !== "all") {
      result = result.filter((l) => l.type === filterType);
    }

    if (filterStatus === "active") result = result.filter((l) => l.isActive);
    else if (filterStatus === "inactive") result = result.filter((l) => !l.isActive);
    else if (filterStatus === "broken") result = result.filter((l) => l.health?.status === "broken");
    else if (filterStatus === "unchecked") result = result.filter((l) => !l.health || l.health.status === "unchecked");

    setFilteredLinks(result);
  }, [links, search, filterCategory, filterType, filterStatus]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l._id !== id));
      fetchHealthSummary();
    }
  };

  const handleToggle = async (id: string) => {
    const res = await fetch(`/api/links/${id}`, { method: "PATCH" });
    if (res.ok) {
      const updated: LinkData = await res.json();
      setLinks((prev) => prev.map((l) => (l._id === id ? updated : l)));
    }
  };

  const handleHealthCheck = async () => {
    setCheckingHealth(true);
    try {
      await fetch("/api/links/health", { method: "POST" });
      await fetchLinks();
      await fetchHealthSummary();
    } finally {
      setCheckingHealth(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingLink(null);
    fetchLinks();
    fetchHealthSummary();
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "working": return <CheckCircle size={14} className="text-emerald-500" />;
      case "redirect": return <AlertTriangle size={14} className="text-amber-500" />;
      case "broken": return <XCircle size={14} className="text-red-500" />;
      default: return <Circle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Link Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all portfolio links in one place</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleHealthCheck}
            disabled={checkingHealth}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent disabled:opacity-50"
          >
            <RefreshCw size={14} className={checkingHealth ? "animate-spin" : ""} />
            {checkingHealth ? "Checking..." : "Check Health"}
          </button>
          <button
            onClick={() => { setEditingLink(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            <Plus size={14} />
            Add Link
          </button>
        </div>
      </div>

      {/* Health Summary Cards */}
      {healthSummary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold">{healthSummary.total}</div>
            <div className="text-xs text-muted-foreground">Total Links</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{healthSummary.active}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold text-red-600">{healthSummary.broken}</div>
            <div className="text-xs text-muted-foreground">Broken</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{healthSummary.redirect}</div>
            <div className="text-xs text-muted-foreground">Redirect</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl font-bold text-gray-400">{healthSummary.unchecked}</div>
            <div className="text-xs text-muted-foreground">Unchecked</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg bg-background"
        >
          <option value="all">All Categories</option>
          {Object.entries(LINK_CATEGORY_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg bg-background"
        >
          <option value="all">All Types</option>
          {Object.entries(LINK_TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg bg-background"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="broken">Broken</option>
          <option value="unchecked">Unchecked</option>
        </select>
      </div>

      {/* Links Table */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading links...</div>
      ) : filteredLinks.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <LinkIcon size={32} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No links found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Label</th>
                <th className="text-left p-3 font-medium">URL</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Health</th>
                <th className="text-left p-3 font-medium">Clicks</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLinks.map((link) => (
                <tr key={link._id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <GripVertical size={14} className="text-muted-foreground cursor-grab" />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 max-w-[250px]">
                      <span className="truncate text-muted-foreground text-xs">{link.url}</span>
                      <button
                        onClick={() => handleCopyUrl(link.url, link._id)}
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        {copiedId === link._id ? <CheckCircle size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{LINK_TYPE_LABELS[link.type]}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{LINK_CATEGORY_LABELS[link.category]}</span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggle(link._id)}
                      className={`inline-flex items-center gap-1 text-xs ${link.isActive ? "text-emerald-600" : "text-gray-400"}`}
                    >
                      {link.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                      {link.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {getHealthIcon(link.health?.status || "unchecked")}
                      <span className="text-xs text-muted-foreground">
                        {link.health?.statusCode || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs text-muted-foreground">{link.clickCount}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-muted"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => { setEditingLink(link); setShowForm(true); }}
                        className="p-1.5 rounded hover:bg-muted"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(link._id)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Link Form Dialog */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background border rounded-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <LinkForm
              link={editingLink}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingLink(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
