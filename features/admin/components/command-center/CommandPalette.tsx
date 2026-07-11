"use client";

import { useEffect, useState, useCallback } from "react";
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
  Keyboard,
  Moon,
  Sun,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { signOut } from "next-auth/react";

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

const pages = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, section: "Navigation" },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban, section: "Navigation" },
  { name: "Skills", href: "/admin/skills", icon: Code2, section: "Navigation" },
  { name: "Inquiries", href: "/admin/inquiries", icon: Mail, section: "Navigation" },
  { name: "Settings", href: "/admin/settings", icon: Settings, section: "Navigation" },
];

const actions = [
  { name: "New Project", href: "/admin/projects/new", icon: Plus, section: "Quick Actions", shortcut: "N P" },
  { name: "New Skill Category", href: "/admin/skills/new", icon: Plus, section: "Quick Actions", shortcut: "N S" },
  { name: "View Portfolio", href: "/", icon: ExternalLink, section: "Quick Actions" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const router = useRouter();

  const runAction = useCallback(
    (action: string) => {
      if (action === "toggle-theme") {
        toggleTheme();
        setCurrentTheme(getTheme());
      } else if (action === "logout") {
        signOut({ callbackUrl: "/" });
      } else {
        router.push(action);
      }
      setOpen(false);
    },
    [router],
  );

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
          <div className="cmdk-overlay" onClick={() => setOpen(false)} />
          <div className="cmdk-content">
            <Command
              className="rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
              loop
            >
              <div className="flex items-center gap-3 px-5 border-b border-white/10">
                <Search size={16} className="text-gray-500 shrink-0" />
                <Command.Input
                  placeholder="Search pages, actions, settings..."
                  className="flex-1 bg-transparent py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none font-medium"
                />
                <kbd className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-500 bg-white/5 border border-white/10 rounded-lg">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[340px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-12 text-center text-sm text-gray-500 font-medium">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Pages" className="px-2 py-2">
                  {pages.map((page) => (
                    <Command.Item
                      key={page.href}
                      value={page.name}
                      onSelect={() => runAction(page.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 cursor-pointer transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white group"
                    >
                      <page.icon size={16} className="text-gray-500 group-data-[selected=true]:text-cyan-400 transition-colors" />
                      <span className="font-medium">{page.name}</span>
                      <ArrowRight size={12} className="ml-auto text-gray-600 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-white/10" />

                <Command.Group heading="Quick Actions" className="px-2 py-2">
                  {actions.map((action) => (
                    <Command.Item
                      key={action.href}
                      value={action.name}
                      onSelect={() => runAction(action.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 cursor-pointer transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white group"
                    >
                      <action.icon size={16} className="text-gray-500 group-data-[selected=true]:text-emerald-400 transition-colors" />
                      <span className="font-medium">{action.name}</span>
                      {action.shortcut && (
                        <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-600 bg-white/5 border border-white/10 rounded">
                          {action.shortcut}
                        </kbd>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-white/10" />

                <Command.Group heading="Preferences" className="px-2 py-2">
                  <Command.Item
                    value="Toggle Theme"
                    onSelect={() => runAction("toggle-theme")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 cursor-pointer transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white group"
                  >
                    {currentTheme === "dark" ? (
                      <Sun size={16} className="text-gray-500 group-data-[selected=true]:text-amber-400 transition-colors" />
                    ) : (
                      <Moon size={16} className="text-gray-500 group-data-[selected=true]:text-blue-400 transition-colors" />
                    )}
                    <span className="font-medium">Toggle Theme</span>
                  </Command.Item>
                  <Command.Item
                    value="Keyboard Shortcuts"
                    onSelect={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 cursor-pointer transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white group"
                  >
                    <Keyboard size={16} className="text-gray-500 group-data-[selected=true]:text-purple-400 transition-colors" />
                    <span className="font-medium">Keyboard Shortcuts</span>
                    <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-600 bg-white/5 border border-white/10 rounded">
                      ?
                    </kbd>
                  </Command.Item>
                  <Command.Item
                    value="Log Out"
                    onSelect={() => runAction("logout")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 cursor-pointer transition-colors data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 group"
                  >
                    <LogOut size={16} className="text-gray-500 group-data-[selected=true]:text-red-400 transition-colors" />
                    <span className="font-medium">Log Out</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">&#8593;&#8595;</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">&#9166;</kbd>
                    Select
                  </span>
                </div>
                <span className="text-[11px] text-gray-600 font-medium">
                  by <span className="text-gray-500">NEXT DEV</span>
                </span>
              </div>
            </Command>
          </div>
        </>
      )}
    </>
  );
}
