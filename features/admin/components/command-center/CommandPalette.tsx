"use client";

import { useEffect, useState, useCallback, useRef, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard, FolderKanban, Search, Sun, Moon, LogOut,
  Clock, Zap, X, type LucideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import type { PaletteItem, ProjectResult } from "@/features/admin/types/command-palette";
import { getRecent, addRecent, getTheme, toggleTheme } from "@/features/admin/lib/command-palette";
import { PAGE_ITEMS, ACTION_ITEMS, SETTINGS_ITEMS, SECTION_ICONS, SECTION_COLORS } from "@/features/admin/data/command-palette";
import CommandItem from "@/features/admin/components/command-center/CommandItem";

type ProjectState = { loading: boolean; projects: ProjectResult[]; fetched: boolean };

function projectReducer(state: ProjectState, action: { type: "load" } | { type: "done"; projects: ProjectResult[] }): ProjectState {
  switch (action.type) {
    case "load": return { ...state, loading: true };
    case "done": return { loading: false, projects: action.projects, fetched: true };
    default: return state;
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(() => getRecent());
  const [currentTheme, setCurrentTheme] = useState(() => getTheme());
  const [projectState, dispatch] = useReducer(projectReducer, { loading: false, projects: [], fetched: false });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !projectState.fetched && !projectState.loading) {
      dispatch({ type: "load" });
      fetch("/api/projects")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            dispatch({
              type: "done",
              projects: data.slice(0, 20).map((p: Record<string, unknown>) => ({
                id: (p.id || p._id || "") as string,
                title: (p.title || "") as string,
                description: (p.description || "") as string,
                category: (p.category || "") as string,
                status: (p.status || "") as string,
                liveUrl: p.liveUrl as string | undefined,
                githubUrl: p.githubUrl as string | undefined,
              })),
            });
          } else {
            dispatch({ type: "done", projects: [] });
          }
        })
        .catch(() => dispatch({ type: "done", projects: [] }));
    }
  }, [open, projectState.fetched, projectState.loading]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runAndClose = useCallback(
    (fn: () => void, id?: string) => {
      if (id) {
        addRecent(id);
        setRecentIds(getRecent());
      }
      fn();
      setOpen(false);
      setQuery("");
    },
    []
  );

  const navigate = useCallback(
    (href: string) => { router.push(href); },
    [router]
  );

  const allItems: PaletteItem[] = [
    ...PAGE_ITEMS.map((item) => ({
      ...item,
      action: () => navigate(item.id.replace("page-", "/admin").replace("page-dashboard", "/admin")),
    })),
    ...ACTION_ITEMS.map((item) => ({
      ...item,
      action: () => {
        if (item.id === "action-new-project") navigate("/admin/projects/new");
        else if (item.id === "action-new-skill") navigate("/admin/skills/new");
        else if (item.id === "action-view-portfolio") window.open("/", "_blank");
      },
    })),
    ...SETTINGS_ITEMS.map((item) => ({
      ...item,
      action: () => {
        const section = item.id.replace("setting-", "");
        navigate(`/admin/settings?s=${section}`);
      },
    })),
    ...projectState.projects.map((project) => ({
      id: `project-${project.id}`,
      name: project.title,
      hint: `${project.category} · ${project.status}`,
      icon: FolderKanban,
      iconColor: "text-violet-400",
      section: "Projects",
      action: () => navigate(`/admin/projects/edit/${project.id}`),
      keywords: [project.category, project.status, project.description],
    })),
  ];

  const recentItems = recentIds
    .map((id) => allItems.find((item) => item.id === id))
    .filter(Boolean) as PaletteItem[];

  const groupedItems = allItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, PaletteItem[]>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200 text-sm font-medium group"
      >
        <Search size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-500 bg-white/5 border border-white/10 rounded-md">
          <span className="text-[11px]">&#8984;</span>K
        </kbd>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] animate-[fade-in_0.15s_ease-out]"
            onClick={() => { setOpen(false); setQuery(""); }}
          />

          <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[580px] z-[1000] animate-[cmdk-slide-in_0.2s_ease-out]">
            <Command className="rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden" loop shouldFilter={true}>
              <div className="flex items-center gap-3 px-5 border-b border-white/[0.06]">
                <div className="relative">
                  <Search size={16} className="text-gray-500 shrink-0" />
                  {projectState.loading && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <Command.Input
                  ref={inputRef}
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search pages, projects, settings, actions..."
                  className="flex-1 bg-transparent py-4 text-[15px] text-white placeholder:text-gray-600 focus:outline-none font-medium"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors">
                    <X size={14} />
                  </button>
                )}
                <kbd className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-600 bg-white/5 border border-white/10 rounded-lg">ESC</kbd>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Search size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">No results found</p>
                      <p className="text-xs text-gray-600 mt-1">Try a different search term</p>
                    </div>
                  </div>
                </Command.Empty>

                {!query && recentItems.length > 0 && (
                  <>
                    <Command.Group heading={<span className="flex items-center gap-1.5"><Clock size={12} className="text-gray-500" />Recent</span>} className="px-2 py-2">
                      {recentItems.map((item) => (
                        <CommandItem key={`recent-${item.id}`} item={item} onSelect={() => runAndClose(item.action, item.id)} isRecent />
                      ))}
                    </Command.Group>
                    <Command.Separator className="my-1 h-px bg-white/[0.06]" />
                  </>
                )}

                {Object.entries(groupedItems).map(([section, items]) => {
                  const SectionIcon: LucideIcon = SECTION_ICONS[section] || LayoutDashboard;
                  const color = SECTION_COLORS[section] || "text-gray-400";
                  const filtered = query
                    ? items.filter((item) => {
                        const q = query.toLowerCase();
                        return (
                          item.name.toLowerCase().includes(q) ||
                          item.hint?.toLowerCase().includes(q) ||
                          item.keywords?.some((k) => k.toLowerCase().includes(q))
                        );
                      })
                    : items;
                  if (filtered.length === 0) return null;
                  return (
                    <Command.Group
                      key={section}
                      heading={
                        <span className="flex items-center gap-1.5">
                          <SectionIcon size={12} className={color} />
                          {section}
                          <span className="text-[10px] text-gray-600 ml-1">{filtered.length}</span>
                        </span>
                      }
                      className="px-2 py-2"
                    >
                      {filtered.map((item) => (
                        <CommandItem key={item.id} item={item} onSelect={() => runAndClose(item.action, item.id)} />
                      ))}
                    </Command.Group>
                  );
                })}

                {!query && (
                  <>
                    <Command.Separator className="my-1 h-px bg-white/[0.06]" />
                    <Command.Group heading={<span className="flex items-center gap-1.5"><Zap size={12} className="text-gray-500" />Quick</span>} className="px-2 py-2">
                      <Command.Item
                        value="toggle-theme"
                        onSelect={() => runAndClose(() => { toggleTheme(); setCurrentTheme(getTheme()); })}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 cursor-pointer transition-all duration-150 data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          {currentTheme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-blue-400" />}
                        </div>
                        <span className="font-medium">Toggle Theme</span>
                        <span className="ml-auto text-[11px] text-gray-600">{currentTheme === "dark" ? "Light" : "Dark"} mode</span>
                      </Command.Item>
                      <Command.Item
                        value="logout"
                        onSelect={() => runAndClose(() => signOut({ callbackUrl: "/" }))}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 cursor-pointer transition-all duration-150 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <LogOut size={14} className="text-red-400" />
                        </div>
                        <span className="font-medium">Log Out</span>
                      </Command.Item>
                    </Command.Group>
                  </>
                )}
              </Command.List>

              <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">&uarr;</kbd>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">&darr;</kbd>
                    <span className="ml-0.5">Navigate</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">&#9166;</kbd>
                    <span>Open</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">Tab</kbd>
                    <span>Group</span>
                  </span>
                </div>
                <span className="text-[11px] text-gray-700 font-medium"><span className="text-gray-600">NEXT</span> DEV</span>
              </div>
            </Command>
          </div>
        </>
      )}
    </>
  );
}
