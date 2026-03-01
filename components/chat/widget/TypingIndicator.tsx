import React from "react"
import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export default function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
        <Bot className="h-6 w-6 text-blue-600" />
      </div>
      <div className="rounded-3xl bg-gray-100 px-6 py-4 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-3 w-3 rounded-full bg-blue-500"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
            className="h-3 w-3 rounded-full bg-blue-500"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
            className="h-3 w-3 rounded-full bg-blue-500"
          />
          <span className="ml-2 text-gray-600 dark:text-slate-400">Soruj AI is typing...</span>
        </div>
      </div>
    </div>
  )
}
