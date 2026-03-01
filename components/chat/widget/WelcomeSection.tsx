import React from "react"
import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import QuickActionsGrid from "./QuickActionsGrid"

interface Action {
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
}

export default function WelcomeSection({
  actions,
  onSelect,
}: {
  actions: Action[]
  onSelect: (prompt: string) => void
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="mb-6 rounded-full bg-white/60 dark:bg-slate-800/60 p-6 sm:p-8"
      >
        <Bot className="h-16 w-16 sm:h-20 sm:w-20 text-blue-600 dark:text-blue-400" />
      </motion.div>

      <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Hello! I'm Soruj AI
      </h2>
      <p className="mb-8 sm:mb-12 max-w-md text-base sm:text-lg leading-relaxed text-gray-600 dark:text-slate-300">
        I'm here to help you explore Soruj's portfolio. Ask me about his projects, experience,
        skills, or how to get in touch!
      </p>

      <div className="w-full">
        <p className="mb-4 sm:mb-5 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-500">
          Get started quickly
        </p>
        <QuickActionsGrid actions={actions} onSelect={onSelect} />
      </div>
    </div>
  )
}
