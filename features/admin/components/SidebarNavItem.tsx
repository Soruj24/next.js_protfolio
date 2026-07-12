"use client";

import { useState } from "react";
import Link from "next/link";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/features/admin/contexts/SidebarContext";
import type { NavItem } from "@/features/admin/types/sidebar";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  onPin: () => void;
  isPinned: boolean;
  depth?: number;
}

export default function SidebarNavItem({
  item,
  isActive,
  collapsed: isCollapsed,
  onPin,
  isPinned,
  depth = 0,
}: SidebarNavItemProps) {
  const { setMobileOpen } = useSidebar();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setMobileOpen(false)}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg transition-all duration-200 outline-none",
        isCollapsed ? "justify-center px-2 py-2.5" : "px-2.5 py-2",
        depth > 0 && !isCollapsed && "ml-4 pl-3",
        isActive
          ? "bg-cyan-500/[0.08] text-white"
          : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]",
        "focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-1"
      )}
      title={isCollapsed ? item.name : undefined}
      tabIndex={0}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cyan-400 rounded-r-full transition-all duration-300 ease-out" />
      )}

      <item.icon
        size={18}
        className={cn(
          "shrink-0 transition-colors duration-200",
          isActive ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400"
        )}
      />

      {!isCollapsed && (
        <span className="flex-1 text-[13px] font-medium truncate leading-none">
          {item.name}
        </span>
      )}

      {!isCollapsed && item.badge && (
        <span
          className={cn(
            "px-1.5 py-0.5 text-[10px] font-bold rounded-full leading-none",
            item.badgeColor || "bg-white/10 text-gray-400"
          )}
        >
          {item.badge}
        </span>
      )}

      {!isCollapsed && item.shortcut && !isActive && (
        <kbd className="hidden group-hover:inline-flex text-[10px] text-gray-600 font-mono bg-white/5 rounded px-1 py-0.5 leading-none">
          {item.shortcut}
        </kbd>
      )}

      {!isCollapsed && hovered && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPin();
          }}
          className={cn(
            "p-0.5 rounded transition-colors duration-150",
            isPinned ? "text-cyan-400 hover:text-cyan-300" : "text-gray-600 hover:text-gray-400"
          )}
          title={isPinned ? "Unpin" : "Pin to top"}
        >
          <Pin size={11} className={cn(isPinned && "fill-current")} />
        </button>
      )}

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
