import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FloatingToggleButton({
  isOpen,
  unreadCount,
  onClick,
}: {
  isOpen: boolean
  unreadCount: number
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
        isOpen ? "bg-white text-blue-600 dark:bg-slate-800" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
      )}
      aria-label={isOpen ? "Close chat" : "Open chat with Soruj AI"}
    >
      {isOpen ? <X className="h-9 w-9" /> : <MessageCircle className="h-9 w-9" />}
      {!isOpen && unreadCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-lg">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </motion.button>
  )
}
