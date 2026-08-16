"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import type { LinkData, LinkType, LinkCategory, CreateLinkInput } from "@/lib/links/link-types";
import { LINK_TYPE_LABELS, LINK_CATEGORY_LABELS } from "@/lib/links/link-types";
import { validateUrl } from "@/lib/links/link-validation";

interface LinkFormProps {
  link: LinkData | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function LinkForm({ link, onSave, onCancel }: LinkFormProps) {
  const [form, setForm] = useState<CreateLinkInput>({
    label: link?.label ?? "",
    url: link?.url ?? "",
    type: (link?.type ?? "other") as LinkType,
    category: (link?.category ?? "social") as LinkCategory,
    icon: link?.icon ?? "",
    isActive: link?.isActive ?? true,
    isExternal: link?.isExternal ?? true,
    openInNewTab: link?.openInNewTab ?? true,
    displayOrder: link?.displayOrder ?? 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlValidation = validateUrl(form.url);
    const newErrors: string[] = [];

    if (!form.label.trim()) newErrors.push("Label is required");
    if (!urlValidation.valid) newErrors.push(urlValidation.error!);
    if (!form.type) newErrors.push("Type is required");
    if (!form.category) newErrors.push("Category is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setSaving(true);

    try {
      const url = link ? `/api/links/${link._id}` : "/api/links";
      const method = link ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, url: urlValidation.normalizedUrl! }),
      });

      if (res.ok) {
        onSave();
      } else {
        const data = await res.json();
        setErrors([data.error || "Failed to save link"]);
      }
    } catch {
      setErrors(["Network error"]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{link ? "Edit Link" : "Add Link"}</h2>
        <button type="button" onClick={onCancel} className="p-1 rounded hover:bg-muted">
          <X size={18} />
        </button>
      </div>

      {errors.length > 0 && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          {errors.map((err, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle size={14} />
              {err}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Label *</label>
        <input
          type="text"
          value={form.label}
          onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
          placeholder="e.g. My GitHub Profile"
          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">URL *</label>
        <input
          type="text"
          value={form.url}
          onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
          placeholder="https://github.com/username"
          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type *</label>
          <select
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as LinkType }))}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
          >
            {Object.entries(LINK_TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as LinkCategory }))}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
          >
            {Object.entries(LINK_CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Display Order</label>
        <input
          type="number"
          value={form.displayOrder}
          onChange={(e) => setForm((p) => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))}
          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
            className="rounded"
          />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.openInNewTab}
            onChange={(e) => setForm((p) => ({ ...p, openInNewTab: e.target.checked }))}
            className="rounded"
          />
          Open in new tab
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : link ? "Update Link" : "Add Link"}
        </button>
      </div>
    </form>
  );
}
