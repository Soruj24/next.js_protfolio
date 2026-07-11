"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const menuItems = [
    { label: "Profile", icon: User, action: () => { router.push("/profile"); setOpen(false); } },
    { label: "Settings", icon: Settings, action: () => { router.push("/admin/settings"); setOpen(false); } },
    { label: "Billing", icon: CreditCard, action: () => setOpen(false), disabled: true },
    { label: "Help & Support", icon: HelpCircle, action: () => setOpen(false), disabled: true },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl transition-all duration-200",
          open
            ? "bg-white/10"
            : "hover:bg-white/5",
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white shadow-lg shadow-cyan-500/20">
          {initials}
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <span className="text-xs font-semibold text-white leading-tight max-w-[100px] truncate">
            {user?.name || "Admin"}
          </span>
          <span className="text-[10px] text-gray-500 font-medium leading-tight">
            {user?.role === "admin" ? "Administrator" : "User"}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={cn(
            "hidden lg:block text-gray-500 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-semibold text-white">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{user?.email || "admin@nextdev.io"}</p>
          </div>

          <div className="p-1.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                disabled={item.disabled}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  item.disabled
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-300 hover:text-white hover:bg-white/5",
                )}
              >
                <item.icon size={15} className={item.disabled ? "text-gray-700" : "text-gray-500"} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 p-1.5">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
