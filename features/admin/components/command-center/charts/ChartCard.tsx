"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export default function ChartCard({
  title, subtitle, icon: Icon, iconColor, children, className,
}: {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon size={16} className={iconColor} />
            <h3 className="text-sm font-semibold text-white">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
