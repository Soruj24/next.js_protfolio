"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  createContext,
  useContext,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  Pin,
  Clock,
  Command,
  PanelLeftClose,
  PanelLeft,
  Home,
  Star,
  X,
  Menu,
  FileCode,
  Layers,
  Users,
  Shield,
  Globe,
  Palette,
  Database,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  shortcut?: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

// ─── Navigation Config ──────────────────────────────────────────

const navigation: NavSection[] = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard, shortcut: "G D" },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3, shortcut: "G A" },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Projects", href: "/admin/projects", icon: FolderKanban, shortcut: "G P" },
      { name: "Skills", href: "/admin/skills", icon: Code2, shortcut: "G S" },
      { name: "Inquiries", href: "/admin/inquiries", icon: Mail, badge: "3", badgeColor: "bg-cyan-400 text-black", shortcut: "G I" },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings, shortcut: "G X" },
    ],
  },
];

const allPages = navigation.flatMap((s) => s.items);

// ─── Storage Helpers ────────────────────────────────────────────

function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorageItem(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ─── SidebarProvider ────────────────────────────────────────────

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => getStorageItem("sb-collapsed", false));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setStorageItem("sb-collapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setCollapsed((p) => !p);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

// ─── Recently Visited Hook ──────────────────────────────────────

function useRecentlyVisited() {
  const pathname = usePathname();
  const [recentHrefs, setRecentHrefs] = useState<string[]>(() =>
    getStorageItem("sb-recent", [])
  );

  useEffect(() => {
    const page = allPages.find((p) => pathname === p.href || (p.href !== "/admin" && pathname.startsWith(p.href)));
    if (!page) return;

    setRecentHrefs((prev) => {
      const filtered = prev.filter((h) => h !== page.href);
      const updated = [page.href, ...filtered].slice(0, 5);
      setStorageItem("sb-recent", updated);
      return updated;
    });
  }, [pathname]);

  const recent = useMemo(
    () =>
      recentHrefs
        .map((href) => allPages.find((p) => p.href === href))
        .filter(Boolean) as NavItem[],
    [recentHrefs],
  );

  return recent;
}

// ─── Pinned Items Hook ──────────────────────────────────────────

function usePinnedItems() {
  const [pinned, setPinned] = useState<string[]>(() =>
    getStorageItem("sb-pinned", ["Dashboard", "Projects"])
  );

  const togglePin = useCallback((name: string) => {
    setPinned((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      setStorageItem("sb-pinned", next);
      return next;
    });
  }, []);

  const pinnedItems = useMemo(
    () => allPages.filter((p) => pinned.includes(p.name)),
    [pinned]
  );

  return { pinnedItems, togglePin, isPinned: (name: string) => pinned.includes(name) };
}

// ─── NavItem Component ──────────────────────────────────────────

function SidebarNavItem({
  item,
  isActive,
  collapsed: isCollapsed,
  onPin,
  isPinned,
  depth = 0,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  onPin: () => void;
  isPinned: boolean;
  depth?: number;
}) {
  const { setMobileOpen } = useSidebar();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setMobileOpen(false)}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg transition-all duration-200 outline-none",
        isCollapsed ? "justify-center px-2 py-2.5" : "px-2.5 py-2",
        depth > 0 && !isCollapsed && "ml-4 pl-3",
        isActive
          ? "bg-cyan-500/[0.08] text-white"
          : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]",
        "focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-1",
      )}
      title={isCollapsed ? item.name : undefined}
      tabIndex={0}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cyan-400 rounded-r-full transition-all duration-300 ease-out" />
      )}

      {/* Icon */}
      <item.icon
        size={18}
        className={cn(
          "shrink-0 transition-colors duration-200",
          isActive ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400",
        )}
      />

      {/* Label */}
      {!isCollapsed && (
        <span className="flex-1 text-[13px] font-medium truncate leading-none">{item.name}</span>
      )}

      {/* Badge */}
      {!isCollapsed && item.badge && (
        <span
          className={cn(
            "px-1.5 py-0.5 text-[10px] font-bold rounded-full leading-none",
            item.badgeColor || "bg-white/10 text-gray-400",
          )}
        >
          {item.badge}
        </span>
      )}

      {/* Shortcut hint */}
      {!isCollapsed && item.shortcut && !isActive && (
        <kbd className="hidden group-hover:inline-flex text-[10px] text-gray-600 font-mono bg-white/5 rounded px-1 py-0.5 leading-none">
          {item.shortcut}
        </kbd>
      )}

      {/* Pin button on hover */}
      {!isCollapsed && hovered && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPin();
          }}
          className={cn(
            "p-0.5 rounded transition-colors duration-150",
            isPinned ? "text-cyan-400 hover:text-cyan-300" : "text-gray-600 hover:text-gray-400",
          )}
          title={isPinned ? "Unpin" : "Pin to top"}
        >
          <Pin size={11} className={cn(isPinned && "fill-current")} />
        </button>
      )}

      {/* Collapsed tooltip */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-[#0a0a0f]/95 border border-white/10 text-xs text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50">
          {item.name}
          {item.shortcut && (
            <span className="ml-2 text-gray-500 font-mono text-[10px]">{item.shortcut}</span>
          )}
        </div>
      )}
    </Link>
  );
}

// ─── Search Component ───────────────────────────────────────────

function SidebarSearch({ collapsed: isCollapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const { setMobileOpen } = useSidebar();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof allPages>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      allPages.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.href.toLowerCase().includes(q)
      )
    );
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      setQuery("");
      setIsOpen(false);
      setMobileOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex items-center justify-center w-full py-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-200 group"
        title="Search (⌘K)"
      >
        <Search size={18} />
      </button>
    );
  }

  return (
    <>
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="w-full h-9 pl-8 pr-14 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/30 focus:bg-white/[0.06] transition-all duration-200 font-medium"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 font-mono bg-white/5 border border-white/[0.08] rounded px-1.5 py-0.5 pointer-events-none">
          ⌘K
        </kbd>
      </div>

      {/* Search results dropdown */}
      {isOpen && (query.trim() ? results.length > 0 : false) && (
        <div className="absolute left-3 right-3 top-full mt-1 rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in-up">
          <div className="p-1.5">
            {results.map((page, i) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-100",
                  i === selectedIndex
                    ? "bg-cyan-500/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                <page.icon size={15} className="text-gray-500" />
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Section Component ──────────────────────────────────────────

function SidebarSection({
  section,
  collapsed: isCollapsed,
  pathname,
  onPin,
  isPinned,
}: {
  section: NavSection;
  collapsed: boolean;
  pathname: string;
  onPin: (name: string) => void;
  isPinned: (name: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-1">
      {!isCollapsed && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 w-full px-2.5 py-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em] hover:text-gray-400 transition-colors duration-200"
        >
          <ChevronRight
            size={10}
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-90",
            )}
          />
          {section.label}
        </button>
      )}
      <div
        className={cn(
          "space-y-0.5 overflow-hidden transition-all duration-300 ease-out",
          isCollapsed || expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {section.items.map((item) => (
          <SidebarNavItem
            key={item.name}
            item={item}
            isActive={
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(item.href + "/")
            }
            collapsed={isCollapsed}
            onPin={() => onPin(item.name)}
            isPinned={isPinned(item.name)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Sidebar Component ─────────────────────────────────────

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const recent = useRecentlyVisited();
  const { pinnedItems, togglePin, isPinned } = usePinnedItems();
  const sidebarRef = useRef<HTMLElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const focusable = sidebarRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;

      const currentIndex = Array.from(focusable).indexOf(
        document.activeElement as Element
      );

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        const next = currentIndex < focusable.length - 1 ? currentIndex + 1 : 0;
        (focusable[next] as HTMLElement).focus();
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : focusable.length - 1;
        (focusable[prev] as HTMLElement).focus();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Top glow ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── Brand ── */}
      <div className={cn("flex items-center h-14 shrink-0", collapsed ? "justify-center px-2" : "px-4")}>
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 min-w-0 group"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-cyan-500/20 shrink-0 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
            ND
            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-white tracking-tight truncate leading-none">
                NEXT DEV
              </h1>
              <p className="text-[9px] font-bold text-cyan-400/70 uppercase tracking-[0.15em] mt-0.5">
                Command Center
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* ── Search ── */}
      <div className={cn("shrink-0 relative", collapsed ? "px-2 mb-2" : "px-3 mb-3")}>
        <SidebarSearch collapsed={collapsed} />
      </div>

      {/* ── Pinned Items ── */}
      {!collapsed && pinnedItems.length > 0 && (
        <div className="px-3 mb-3">
          <div className="flex items-center gap-1 px-2.5 py-1.5 mb-1">
            <Pin size={10} className="text-gray-600" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em]">Pinned</span>
          </div>
          <div className="space-y-0.5">
            {pinnedItems.map((item) => (
              <SidebarNavItem
                key={`pinned-${item.name}`}
                item={item}
                isActive={
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname.startsWith(item.href + "/")
                }
                collapsed={collapsed}
                onPin={() => togglePin(item.name)}
                isPinned={true}
              />
            ))}
          </div>
          <div className="mt-2 h-px bg-white/[0.04]" />
        </div>
      )}

      {/* ── Navigation ── */}
      <nav ref={sidebarRef} className="flex-1 overflow-y-auto scrollbar-hide px-3 py-1" role="navigation" aria-label="Sidebar">
        {navigation.map((section) => (
          <SidebarSection
            key={section.label}
            section={section}
            collapsed={collapsed}
            pathname={pathname}
            onPin={togglePin}
            isPinned={isPinned}
          />
        ))}
      </nav>

      {/* ── Recently Visited ── */}
      {!collapsed && recent.length > 0 && (
        <div className="px-3 pb-2 shrink-0">
          <div className="h-px bg-white/[0.04] mb-2" />
          <div className="flex items-center gap-1 px-2.5 py-1.5">
            <Clock size={10} className="text-gray-600" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em]">Recent</span>
          </div>
          <div className="space-y-0.5">
            {recent.slice(0, 3).map((item) => (
              <Link
                key={`recent-${item.href}`}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/[0.04] transition-all duration-200"
              >
                <item.icon size={14} className="text-gray-600 shrink-0" />
                <span className="text-[12px] font-medium truncate">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Collapse Toggle ── */}
      <div className="hidden lg:flex items-center border-t border-white/[0.04] px-3 py-2 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-200",
            collapsed ? "justify-center px-2 py-2" : "px-2.5 py-2",
          )}
          title={collapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}
        >
          {collapsed ? (
            <PanelLeft size={16} />
          ) : (
            <>
              <PanelLeftClose size={16} />
              <span className="text-[11px] font-semibold">Collapse</span>
              <kbd className="ml-auto text-[10px] text-gray-700 font-mono bg-white/5 border border-white/[0.06] rounded px-1 py-0.5">
                ⌘B
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* ── User & Logout ── */}
      <div className={cn("shrink-0 border-t border-white/[0.04]", collapsed ? "px-2 py-2" : "px-3 py-3")}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-cyan-500/15 shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate leading-none">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-gray-600 font-medium truncate mt-0.5">
                {user?.role === "admin" ? "Administrator" : "User"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                {initials}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center justify-center w-full py-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile Toggle Button ── */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* ── Mobile Backdrop ── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "fixed lg:sticky inset-y-0 left-0 z-[90] flex flex-col",
          "bg-[#06060b]/95 backdrop-blur-2xl border-r border-white/[0.06]",
          "transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "lg:translate-x-0",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
