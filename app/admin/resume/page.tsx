"use client";

import { useEffect, useState } from "react";

/**
 * Admin panel — app/admin/resume/page.tsx
 *
 * Loads current resume data from GET /api/resume, lets you edit every
 * field, and saves back via PUT /api/resume. The moment you click Save,
 * the next PDF download (/api/resume-pdf) will reflect these changes.
 *
 * ⚠️ This page has NO auth check of its own — it assumes you will wrap
 * it with whatever auth/middleware protects the rest of your admin panel
 * (e.g. a layout.tsx that redirects non-admins, or middleware.ts route
 * protection on /admin/*). Do not deploy this unprotected.
 */

type SkillGroup = { label: string; items: string };
type Project = { title: string; desc: string; tags: string[]; stack: string };
type Education = { title: string; institute: string };

type ResumeData = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  portfolio: string;
  linkedin: string;
  summary: string[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  competencies: string[];
  softSkills: string[];
  languages: string[];
};

const EMPTY: ResumeData = {
  name: "",
  role: "",
  location: "",
  email: "",
  phone: "",
  github: "",
  portfolio: "",
  linkedin: "",
  summary: [""],
  skills: [{ label: "", items: "" }],
  projects: [{ title: "", desc: "", tags: [], stack: "" }],
  education: [{ title: "", institute: "" }],
  competencies: [],
  softSkills: [],
  languages: [],
};

// ---------- small reusable bits ----------

function Field({ label, value, onChange, textarea = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-stone-700 mb-1">{label}</span>
      {textarea ? (
        <textarea
          className="w-full rounded-lg border border-stone-300 bg-white text-stone-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-lg border border-stone-300 bg-white text-stone-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function RemovableRow({ onRemove, children }: { onRemove: () => void; children: React.ReactNode }) {
  return (
    <div className="relative border border-stone-200 rounded-lg p-4 mb-3 bg-white">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
      >
        Remove
      </button>
      {children}
    </div>
  );
}

// ---------- main page ----------

export default function AdminResumePage() {
  const [data, setData] = useState<ResumeData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((r) => r.json())
      .then((d) => setData({ ...EMPTY, ...d }))
      .catch(() => setError("Could not load resume data."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setSavedAt(new Date().toLocaleTimeString());
    } catch {
      setError("Save failed — check the console / API route.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-stone-500 text-sm">Loading resume data…</div>;
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-stone-900">Resume Admin</h1>
          <div className="flex items-center gap-3">
            {savedAt && <span className="text-xs text-stone-400">Saved at {savedAt}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-emerald-800 text-white text-sm font-medium px-5 py-2 hover:bg-emerald-900 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {/* ---------------- Basic Info ---------------- */}
        <SectionCard title="Basic Info">
          <Field label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
          <Field label="Role / Title" value={data.role} onChange={(v) => setData({ ...data, role: v })} />
          <Field label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
          <Field label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
          <Field label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
          <Field label="GitHub URL" value={data.github} onChange={(v) => setData({ ...data, github: v })} />
          <Field label="Portfolio URL" value={data.portfolio} onChange={(v) => setData({ ...data, portfolio: v })} />
          <Field label="LinkedIn URL" value={data.linkedin} onChange={(v) => setData({ ...data, linkedin: v })} />
        </SectionCard>

        {/* ---------------- Summary ---------------- */}
        <SectionCard title="Summary">
          {data.summary.map((para, i) => (
            <RemovableRow
              key={i}
              onRemove={() => setData({ ...data, summary: data.summary.filter((_, idx) => idx !== i) })}
            >
              <Field
                label={`Paragraph ${i + 1}`}
                value={para}
                textarea
                onChange={(v) => {
                  const next = [...data.summary];
                  next[i] = v;
                  setData({ ...data, summary: next });
                }}
              />
            </RemovableRow>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, summary: [...data.summary, ""] })}
            className="text-sm text-emerald-800 hover:underline"
          >
            + Add paragraph
          </button>
        </SectionCard>

        {/* ---------------- Skills ---------------- */}
        <SectionCard title="Technical Skills">
          {data.skills.map((s, i) => (
            <RemovableRow
              key={i}
              onRemove={() => setData({ ...data, skills: data.skills.filter((_, idx) => idx !== i) })}
            >
              <Field
                label="Category (e.g. Frontend)"
                value={s.label}
                onChange={(v) => {
                  const next = [...data.skills];
                  next[i] = { ...next[i], label: v };
                  setData({ ...data, skills: next });
                }}
              />
              <Field
                label="Items (comma-separated)"
                value={s.items}
                textarea
                onChange={(v) => {
                  const next = [...data.skills];
                  next[i] = { ...next[i], items: v };
                  setData({ ...data, skills: next });
                }}
              />
            </RemovableRow>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, skills: [...data.skills, { label: "", items: "" }] })}
            className="text-sm text-emerald-800 hover:underline"
          >
            + Add skill category
          </button>
        </SectionCard>

        {/* ---------------- Projects ---------------- */}
        <SectionCard title="Projects">
          {data.projects.map((p, i) => (
            <RemovableRow
              key={i}
              onRemove={() => setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })}
            >
              <Field
                label="Title"
                value={p.title}
                onChange={(v) => {
                  const next = [...data.projects];
                  next[i] = { ...next[i], title: v };
                  setData({ ...data, projects: next });
                }}
              />
              <Field
                label="Description"
                value={p.desc}
                textarea
                onChange={(v) => {
                  const next = [...data.projects];
                  next[i] = { ...next[i], desc: v };
                  setData({ ...data, projects: next });
                }}
              />
              <Field
                label="Tags (comma-separated)"
                value={p.tags.join(", ")}
                onChange={(v) => {
                  const next = [...data.projects];
                  next[i] = { ...next[i], tags: v.split(",").map((t) => t.trim()).filter(Boolean) };
                  setData({ ...data, projects: next });
                }}
              />
              <Field
                label="Tech Stack"
                value={p.stack}
                onChange={(v) => {
                  const next = [...data.projects];
                  next[i] = { ...next[i], stack: v };
                  setData({ ...data, projects: next });
                }}
              />
            </RemovableRow>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({ ...data, projects: [...data.projects, { title: "", desc: "", tags: [], stack: "" }] })
            }
            className="text-sm text-emerald-800 hover:underline"
          >
            + Add project
          </button>
        </SectionCard>

        {/* ---------------- Education ---------------- */}
        <SectionCard title="Education">
          {data.education.map((e, i) => (
            <RemovableRow
              key={i}
              onRemove={() => setData({ ...data, education: data.education.filter((_, idx) => idx !== i) })}
            >
              <Field
                label="Title (e.g. HSC — Science)"
                value={e.title}
                onChange={(v) => {
                  const next = [...data.education];
                  next[i] = { ...next[i], title: v };
                  setData({ ...data, education: next });
                }}
              />
              <Field
                label="Institute"
                value={e.institute}
                onChange={(v) => {
                  const next = [...data.education];
                  next[i] = { ...next[i], institute: v };
                  setData({ ...data, education: next });
                }}
              />
            </RemovableRow>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, education: [...data.education, { title: "", institute: "" }] })}
            className="text-sm text-emerald-800 hover:underline"
          >
            + Add education
          </button>
        </SectionCard>

        {/* ---------------- Competencies / Soft Skills / Languages ---------------- */}
        <SectionCard title="Competencies, Soft Skills & Languages">
          <Field
            label="Core Competencies (comma-separated)"
            value={data.competencies.join(", ")}
            textarea
            onChange={(v) =>
              setData({ ...data, competencies: v.split(",").map((c) => c.trim()).filter(Boolean) })
            }
          />
          <Field
            label="Soft Skills (comma-separated)"
            value={data.softSkills.join(", ")}
            textarea
            onChange={(v) =>
              setData({ ...data, softSkills: v.split(",").map((c) => c.trim()).filter(Boolean) })
            }
          />
          <Field
            label="Languages (comma-separated)"
            value={data.languages.join(", ")}
            onChange={(v) =>
              setData({ ...data, languages: v.split(",").map((c) => c.trim()).filter(Boolean) })
            }
          />
        </SectionCard>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-emerald-800 text-white text-sm font-medium px-6 py-2.5 hover:bg-emerald-900 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}