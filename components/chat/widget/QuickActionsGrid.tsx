import React from "react"
import { cn } from "@/lib/utils"

interface Action {
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
}

interface QuickActionsGridProps {
  actions: Action[]
  onSelect: (prompt: string) => void
}

export default function QuickActionsGrid({ actions, onSelect }: QuickActionsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.prompt)}
          className={cn(
            "flex flex-col items-center gap-4 rounded-2xl p-6 sm:p-8 text-center transition-all",
            "bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/60 backdrop-blur",
            "hover:shadow-[0_10px_30px_rgba(6,182,212,0.35)] hover:ring-1 hover:ring-cyan-400/40"
          )}
        >
          <action.icon className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
          <span className="font-bold text-gray-800 dark:text-slate-200">{action.label}</span>
        </button>
      ))}
    </div>
  )}
