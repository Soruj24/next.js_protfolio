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
        className="mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-10 dark:from-blue-900/30 dark:to-purple-900/30"
      >
        <Bot className="h-24 w-24 text-blue-600 dark:text-blue-400" />
      </motion.div>

      <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">
        Hello! I'm Soruj AI
      </h2>
      <p className="mb-12 max-w-md text-lg leading-relaxed text-gray-600 dark:text-slate-300">
        I'm here to help you explore Soruj's portfolio. Ask me about his projects, experience,
        skills, or how to get in touch!
      </p>

      <div className="w-full">
        <p className="mb-5 text-left text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-500">
          Get started quickly
        </p>
        <QuickActionsGrid actions={actions} onSelect={onSelect} />
      </div>
    </div>
  )
}
