"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Code2,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-[90] transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[100px] rounded-full" />
        </div>

        <div className="p-8 relative">
          <h1 className="text-2xl font-black tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              NEXT AI
            </span>
            <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded border border-cyan-500/30 text-cyan-400 align-top">
              ADMIN
            </span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 relative">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-white/10 shadow-lg shadow-cyan-500/5"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  <item.icon size={18} />
                </div>
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 relative">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3.5 w-full text-left text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group"
          >
            <div className="p-2 rounded-xl bg-red-500/10 group-hover:bg-red-500/20">
              <LogOut size={18} />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
