"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarNavItem from "@/features/admin/components/SidebarNavItem";
import type { NavSection } from "@/features/admin/types/sidebar";

interface SidebarSectionProps {
  section: NavSection;
  collapsed: boolean;
  pathname: string;
  onPin: (name: string) => void;
  isPinned: (name: string) => boolean;
}

export default function SidebarSection({
  section,
  collapsed: isCollapsed,
  pathname,
  onPin,
  isPinned,
}: SidebarSectionProps) {
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
            className={cn("transition-transform duration-200", expanded && "rotate-90")}
          />
          {section.label}
        </button>
      )}
      <div
        className={cn(
          "space-y-0.5 overflow-hidden transition-all duration-300 ease-out",
          isCollapsed || expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
