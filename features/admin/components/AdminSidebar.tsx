"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Code2,
  Menu,
  X,
  Mail,
  ChevronLeft,
  ChevronRight,
  Circle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Projects", href: "/admin/projects", icon: FolderKanban },
      { name: "Skills", href: "/admin/skills", icon: Code2 },
      { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky inset-y-0 left-0 z-[90] flex flex-col bg-[#06060b]/90 backdrop-blur-2xl border-r border-white/[0.06] transition-all duration-300 lg:translate-x-0",
          collapsed ? "sidebar-collapsed" : "sidebar-expanded",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        {/* Brand */}
        <div className={cn("flex items-center h-16 shrink-0", collapsed ? "justify-center px-2" : "px-5")}>
          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-cyan-500/20 shrink-0">
              ND
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white tracking-tight truncate">NEXT DEV</h1>
                <p className="text-[9px] font-bold text-cyan-400/70 uppercase tracking-[0.2em]">Command Center</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2">
          {navigation.map((section, sectionIndex) => (
            <div key={section.label} className={cn(sectionIndex > 0 && "mt-6")}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em]">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl transition-all duration-200 relative",
                        collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]",
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cyan-400 rounded-r-full" />
                      )}
                      <item.icon
                        size={18}
                        className={cn(
                          "shrink-0 transition-colors",
                          isActive ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400",
                        )}
                      />
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">{item.name}</span>
                      )}
                      {!collapsed && isActive && (
                        <Circle
                          size={5}
                          className="ml-auto text-cyan-400 fill-cyan-400 shrink-0"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle (desktop only) */}
        <div className="hidden lg:flex items-center justify-center border-t border-white/[0.06] px-3 py-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-xl text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Bottom section */}
        <div className={cn("shrink-0 border-t border-white/[0.06] p-3", collapsed && "px-2")}>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={cn(
              "group flex items-center gap-3 w-full rounded-xl transition-all duration-200 text-gray-600 hover:text-red-400 hover:bg-red-500/[0.06]",
              collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
            )}
            title={collapsed ? "Log out" : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
