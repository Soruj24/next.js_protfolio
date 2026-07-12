"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  PanelLeftClose,
  PanelLeft,
  Pin,
  Clock,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar, SidebarProvider } from "@/features/admin/contexts/SidebarContext";
import { navigation } from "@/features/admin/data/navigation";
import { useRecentlyVisited } from "@/features/admin/hooks/useRecentlyVisited";
import { usePinnedItems } from "@/features/admin/hooks/usePinnedItems";
import { useUnreadCount } from "@/features/admin/hooks/useUnreadCount";
import SidebarNavItem from "@/features/admin/components/SidebarNavItem";
import SidebarSearch from "@/features/admin/components/SidebarSearch";
import SidebarSection from "@/features/admin/components/SidebarSection";

export { SidebarProvider };

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const recent = useRecentlyVisited();
  const { pinnedItems, togglePin, isPinned } = usePinnedItems();
  const unreadCount = useUnreadCount();
  const sidebarRef = useRef<HTMLElement>(null);

  const navigationWithBadge = useMemo(() => {
    return navigation.map((section) => ({
      ...section,
      items: section.items.map((item) => {
        if (item.name === "Inquiries" && unreadCount > 0) {
          return { ...item, badge: String(unreadCount) };
        }
        return item;
      }),
    }));
  }, [unreadCount]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const focusable = sidebarRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable || focusable.length === 0) return;

      const currentIndex = Array.from(focusable).indexOf(document.activeElement as Element);

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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

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
              <h1 className="text-sm font-bold text-white tracking-tight truncate leading-none">NEXT DEV</h1>
              <p className="text-[9px] font-bold text-cyan-400/70 uppercase tracking-[0.15em] mt-0.5">Command Center</p>
            </div>
          )}
        </Link>
      </div>

      <div className={cn("shrink-0 relative", collapsed ? "px-2 mb-2" : "px-3 mb-3")}>
        <SidebarSearch collapsed={collapsed} />
      </div>

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

      <nav ref={sidebarRef} className="flex-1 overflow-y-auto scrollbar-hide px-3 py-1" role="navigation" aria-label="Sidebar">
        {navigationWithBadge.map((section) => (
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

      <div className="hidden lg:flex items-center border-t border-white/[0.04] px-3 py-2 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-200",
            collapsed ? "justify-center px-2 py-2" : "px-2.5 py-2"
          )}
          title={collapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}
        >
          {collapsed ? (
            <PanelLeft size={16} />
          ) : (
            <>
              <PanelLeftClose size={16} />
              <span className="text-[11px] font-semibold">Collapse</span>
              <kbd className="ml-auto text-[10px] text-gray-700 font-mono bg-white/5 border border-white/[0.06] rounded px-1 py-0.5">⌘B</kbd>
            </>
          )}
        </button>
      </div>

      <div className={cn("shrink-0 border-t border-white/[0.04]", collapsed ? "px-2 py-2" : "px-3 py-3")}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-cyan-500/15 shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate leading-none">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-gray-600 font-medium truncate mt-0.5">{user?.role === "admin" ? "Administrator" : "User"}</p>
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
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed lg:sticky inset-y-0 left-0 z-[90] flex flex-col",
          "bg-[#06060b]/95 backdrop-blur-2xl border-r border-white/[0.06]",
          "transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "lg:translate-x-0",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
