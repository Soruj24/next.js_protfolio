import { cn } from "@/lib/utils";
import { TYPE_CONFIG } from "@/features/admin/data/timeline";
import { formatTimestamp } from "@/features/admin/lib/timeline";
import { ExternalLink } from "lucide-react";
import type { TimelineItem } from "@/app/api/timeline/route";

export default function TimelineDateGroup({
  group, items,
}: {
  group: string;
  items: TimelineItem[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{group}</h3>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[10px] font-bold text-gray-600">{items.length}</span>
      </div>

      <div className="space-y-0 ml-5 border-l border-white/[0.06]">
        {items.map((item) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.system;
          const Icon = config.icon;

          return (
            <div key={item.id} className="relative flex items-start gap-4 pb-6 group">
              <div className={cn("absolute left-[-21px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a12] z-10", config.dot)} />

              <div className={cn("p-2 rounded-xl shrink-0 mt-0.5", config.bg)}>
                <Icon size={14} className={config.color} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">{formatTimestamp(item.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
