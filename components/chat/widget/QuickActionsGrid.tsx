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
            "flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50",
            "dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
          )}
        >
          <action.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-gray-800 dark:text-slate-200">{action.label}</span>
        </button>
      ))}
    </div>
  )}
