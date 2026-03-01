import React from "react"
import { motion } from "framer-motion"
import { Sparkles, X } from "lucide-react"

interface NudgeBannerProps {
  onOpen: () => void
  onDismiss: () => void
}

export default function NudgeBanner({ onOpen, onDismiss }: NudgeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onOpen}
      className="cursor-pointer select-none mb-2 flex max-w-[240px] items-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-5 py-4 text-white shadow-[0_10px_30px_rgba(6,182,212,0.45)] ring-1 ring-white/10 backdrop-blur"
    >
      <Sparkles className="h-6 w-6" />
      <div>
        <p className="font-bold">Hi there!</p>
        <p className="text-sm opacity-90">Tap to chat with Soruj 😊</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDismiss()
        }}
        className="ml-auto"
      >
        <X className="h-5 w-5 opacity-70" />
      </button>
    </motion.div>
  )
}
