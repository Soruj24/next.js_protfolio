"use client";

import { Command } from "cmdk";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaletteItem } from "@/features/admin/types/command-palette";

export default function CommandItem({
  item, onSelect, isRecent,
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
      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center transition-colors", "bg-white/5 group-data-[selected=true]:bg-white/10")}>
        <Icon size={14} className={cn("transition-colors", item.iconColor || "text-gray-500", "group-data-[selected=true]:scale-110 transition-transform")} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium block truncate">{item.name}</span>
        {item.hint && (
          <span className="text-[11px] text-gray-600 group-data-[selected=true]:text-gray-500 block truncate">{item.hint}</span>
        )}
      </div>
      <ArrowUpRight size={13} className="text-gray-700 opacity-0 group-data-[selected=true]:opacity-100 transition-all group-data-[selected=true]:translate-x-0.5 group-data-[selected=true]:-translate-y-0.5 shrink-0" />
    </Command.Item>
  );
}
