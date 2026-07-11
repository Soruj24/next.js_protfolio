"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  Plus,
  Search,
  ArrowRight,
  Moon,
  Sun,
  LogOut,
  ExternalLink,
  Clock,
  Rocket,
  Eye,
  Pencil,
  Globe,
  Zap,
  Hash,
  ArrowUpRight,
  FileText,
  Palette,
  TrendingUp,
  BarChart3,
  X,
  type LucideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────

interface PaletteItem {
  id: string;
  name: string;
  hint?: string;
  icon: LucideIcon;
  iconColor?: string;
  section: string;
  action: () => void;
  keywords?: string[];
}

interface ProjectResult {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
}

// ─── Recent Commands Storage ────────────────────────────────────

const RECENT_KEY = "cmd-recent-commands";
const MAX_RECENT = 5;

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function addRecent(id: string) {
  const recent = getRecent().filter((r) => r !== id);
  recent.unshift(id);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

// ─── Theme Helpers ──────────────────────────────────────────────

function getTheme(): string {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function toggleTheme() {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(next);
}

// ─── Static Pages ───────────────────────────────────────────────

const PAGE_ITEMS: Omit<PaletteItem, "action">[] = [
  { id: "page-dashboard", name: "Dashboard", hint: "Overview & metrics", icon: LayoutDashboard, iconColor: "text-cyan-400", section: "Pages", keywords: ["home", "overview", "metrics"] },
  { id: "page-analytics", name: "Analytics", hint: "Traffic & performance", icon: BarChart3, iconColor: "text-blue-400", section: "Pages", keywords: ["traffic", "stats", "charts"] },
  { id: "page-timeline", name: "Timeline", hint: "Activity timeline", icon: Clock, iconColor: "text-amber-400", section: "Pages", keywords: ["activity", "events", "history"] },
  { id: "page-projects", name: "Projects", hint: "Manage portfolio", icon: FolderKanban, iconColor: "text-violet-400", section: "Pages", keywords: ["portfolio", "work"] },
  { id: "page-skills", name: "Skills", hint: "Skill categories", icon: Code2, iconColor: "text-emerald-400", section: "Pages", keywords: ["tech", "abilities"] },
  { id: "page-inquiries", name: "Inquiries", hint: "Contact messages", icon: Mail, iconColor: "text-amber-400", section: "Pages", keywords: ["messages", "contact", "inbox"] },
  { id: "page-settings", name: "Settings", hint: "Configuration", icon: Settings, iconColor: "text-gray-400", section: "Pages", keywords: ["config", "preferences", "options"] },
];

const ACTION_ITEMS: Omit<PaletteItem, "action">[] = [
  { id: "action-new-project", name: "New Project", hint: "Create project", icon: Plus, iconColor: "text-emerald-400", section: "Actions", keywords: ["create", "add"] },
  { id: "action-new-skill", name: "New Skill Category", hint: "Create skill", icon: Plus, iconColor: "text-sky-400", section: "Actions", keywords: ["create", "add"] },
  { id: "action-view-portfolio", name: "View Live Portfolio", hint: "Opens in new tab", icon: ExternalLink, iconColor: "text-pink-400", section: "Actions", keywords: ["preview", "live", "site"] },
];

const SETTINGS_ITEMS: Omit<PaletteItem, "action">[] = [
  { id: "setting-profile", name: "Profile Settings", hint: "Personal info & avatar", icon: Hash, iconColor: "text-cyan-400", section: "Settings", keywords: ["profile", "avatar", "bio", "personal"] },
  { id: "setting-portfolio", name: "Portfolio Settings", hint: "Title, description, branding", icon: Globe, iconColor: "text-blue-400", section: "Settings", keywords: ["portfolio", "brand", "title"] },
  { id: "setting-seo", name: "SEO Settings", hint: "Meta tags & analytics", icon: TrendingUp, iconColor: "text-green-400", section: "Settings", keywords: ["seo", "meta", "analytics", "search"] },
  { id: "setting-social", name: "Social Links", hint: "Social media profiles", icon: Globe, iconColor: "text-pink-400", section: "Settings", keywords: ["social", "links", "github", "linkedin"] },
  { id: "setting-appearance", name: "Appearance", hint: "Theme & colors", icon: Palette, iconColor: "text-violet-400", section: "Settings", keywords: ["theme", "color", "font", "style"] },
  { id: "setting-notifications", name: "Notifications", hint: "Alert preferences", icon: Mail, iconColor: "text-amber-400", section: "Settings", keywords: ["alert", "email", "notify"] },
  { id: "setting-security", name: "Security", hint: "Password & 2FA", icon: Zap, iconColor: "text-red-400", section: "Settings", keywords: ["password", "2fa", "security", "session"] },
  { id: "setting-data", name: "Data & Backup", hint: "Export, import, autosave", icon: FileText, iconColor: "text-emerald-400", section: "Settings", keywords: ["export", "import", "backup", "save"] },
];

// ─── Component ──────────────────────────────────────────────────

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<ProjectResult[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent commands
  useEffect(() => {
    setRecentIds(getRecent());
  }, []);

  // Fetch projects on open
  useEffect(() => {
    if (open && projects.length === 0) {
      setLoadingProjects(true);
      fetch("/api/projects")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProjects(
              data.slice(0, 20).map((p: Record<string, unknown>) => ({
                id: (p.id || p._id || "") as string,
                title: (p.title || "") as string,
                description: (p.description || "") as string,
                category: (p.category || "") as string,
                status: (p.status || "") as string,
                liveUrl: p.liveUrl as string | undefined,
                githubUrl: p.githubUrl as string | undefined,
              }))
            );
          }
        })
        .catch(() => {})
        .finally(() => setLoadingProjects(false));
    }
  }, [open, projects.length]);

  // Toggle theme
  useEffect(() => {
    setCurrentTheme(getTheme());
  }, []);

  // Global Ctrl+K handler
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
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  // Build all items
  const allItems: PaletteItem[] = [
    // Pages
    ...PAGE_ITEMS.map((item) => ({
      ...item,
      action: () => navigate(item.id.replace("page-", "/admin").replace("page-dashboard", "/admin")),
    })),
    // Quick Actions
    ...ACTION_ITEMS.map((item) => ({
      ...item,
      action: () => {
        if (item.id === "action-new-project") navigate("/admin/projects/new");
        else if (item.id === "action-new-skill") navigate("/admin/skills/new");
        else if (item.id === "action-view-portfolio") window.open("/", "_blank");
      },
    })),
    // Settings
    ...SETTINGS_ITEMS.map((item) => ({
      ...item,
      action: () => {
        const section = item.id.replace("setting-", "");
        navigate(`/admin/settings?s=${section}`);
      },
    })),
    // Dynamic: Projects
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      name: project.title,
      hint: `${project.category} \u00b7 ${project.status}`,
      icon: FolderKanban,
      iconColor: "text-violet-400",
      section: "Projects",
      action: () => navigate(`/admin/projects/edit/${project.id}`),
      keywords: [project.category, project.status, project.description],
    })),
  ];

  // Filter recent items
  const recentItems = recentIds
    .map((id) => allItems.find((item) => item.id === id))
    .filter(Boolean) as PaletteItem[];

  // Group items by section
  const groupedItems = allItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, PaletteItem[]>
  );

  // Section icons
  const sectionIcons: Record<string, LucideIcon> = {
    Pages: LayoutDashboard,
    Actions: Zap,
    Settings: Settings,
    Projects: FolderKanban,
  };

  const sectionColors: Record<string, string> = {
    Pages: "text-cyan-400",
    Actions: "text-emerald-400",
    Settings: "text-violet-400",
    Projects: "text-amber-400",
  };

  return (
    <>
      {/* Trigger Button */}
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

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] animate-[fade-in_0.15s_ease-out]"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />

          <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[580px] z-[1000] animate-[cmdk-slide-in_0.2s_ease-out]">
            <Command
              className="rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden"
              loop
              shouldFilter={true}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 border-b border-white/[0.06]">
                <div className="relative">
                  <Search size={16} className="text-gray-500 shrink-0" />
                  {loadingProjects && (
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
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
                <kbd className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-600 bg-white/5 border border-white/10 rounded-lg">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Search size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">No results found</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Try a different search term
                      </p>
                    </div>
                  </div>
                </Command.Empty>

                {/* Recent Commands */}
                {!query && recentItems.length > 0 && (
                  <>
                    <Command.Group
                      heading={
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-gray-500" />
                          Recent
                        </span>
                      }
                      className="px-2 py-2"
                    >
                      {recentItems.map((item) => (
                        <CommandItem
                          key={`recent-${item.id}`}
                          item={item}
                          onSelect={() => runAndClose(item.action, item.id)}
                          isRecent
                        />
                      ))}
                    </Command.Group>
                    <Command.Separator className="my-1 h-px bg-white/[0.06]" />
                  </>
                )}

                {/* Dynamic Sections */}
                {Object.entries(groupedItems).map(([section, items]) => {
                  const SectionIcon = sectionIcons[section] || LayoutDashboard;
                  const color = sectionColors[section] || "text-gray-400";

                  // Filter items by query
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
                          <span className="text-[10px] text-gray-600 ml-1">
                            {filtered.length}
                          </span>
                        </span>
                      }
                      className="px-2 py-2"
                    >
                      {filtered.map((item) => (
                        <CommandItem
                          key={item.id}
                          item={item}
                          onSelect={() => runAndClose(item.action, item.id)}
                        />
                      ))}
                    </Command.Group>
                  );
                })}

                {/* Quick Theme & Logout at bottom */}
                {!query && (
                  <>
                    <Command.Separator className="my-1 h-px bg-white/[0.06]" />
                    <Command.Group heading={<span className="flex items-center gap-1.5"><Zap size={12} className="text-gray-500" /> Quick</span>} className="px-2 py-2">
                      <Command.Item
                        value="toggle-theme"
                        onSelect={() =>
                          runAndClose(() => {
                            toggleTheme();
                            setCurrentTheme(getTheme());
                          })
                        }
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 cursor-pointer transition-all duration-150 data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          {currentTheme === "dark" ? (
                            <Sun size={14} className="text-amber-400" />
                          ) : (
                            <Moon size={14} className="text-blue-400" />
                          )}
                        </div>
                        <span className="font-medium">Toggle Theme</span>
                        <span className="ml-auto text-[11px] text-gray-600">
                          {currentTheme === "dark" ? "Light" : "Dark"} mode
                        </span>
                      </Command.Item>
                      <Command.Item
                        value="logout"
                        onSelect={() =>
                          runAndClose(() => signOut({ callbackUrl: "/" }))
                        }
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

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">
                      &uarr;
                    </kbd>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">
                      &darr;
                    </kbd>
                    <span className="ml-0.5">Navigate</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">
                      &#9166;
                    </kbd>
                    <span>Open</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">
                      Tab
                    </kbd>
                    <span>Group</span>
                  </span>
                </div>
                <span className="text-[11px] text-gray-700 font-medium">
                  <span className="text-gray-600">NEXT</span> DEV
                </span>
              </div>
            </Command>
          </div>
        </>
      )}
    </>
  );
}

// ─── Command Item ───────────────────────────────────────────────

function CommandItem({
  item,
  onSelect,
  isRecent,
}: {
  item: PaletteItem;
  onSelect: () => void;
  isRecent?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Command.Item
      value={`${item.section}-${item.name}-${item.keywords?.join(" ") || ""}`}
      onSelect={onSelect}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-150 group",
        "data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white",
        isRecent ? "text-gray-300" : "text-gray-400"
      )}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
          "bg-white/5 group-data-[selected=true]:bg-white/10"
        )}
      >
        <Icon
          size={14}
          className={cn(
            "transition-colors",
            item.iconColor || "text-gray-500",
            "group-data-[selected=true]:scale-110 transition-transform"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium block truncate">{item.name}</span>
        {item.hint && (
          <span className="text-[11px] text-gray-600 group-data-[selected=true]:text-gray-500 block truncate">
            {item.hint}
          </span>
        )}
      </div>
      <ArrowUpRight
        size={13}
        className="text-gray-700 opacity-0 group-data-[selected=true]:opacity-100 transition-all group-data-[selected=true]:translate-x-0.5 group-data-[selected=true]:-translate-y-0.5 shrink-0"
      />
    </Command.Item>
  );
}
