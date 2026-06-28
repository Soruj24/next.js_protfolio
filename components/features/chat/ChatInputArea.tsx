import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInputAreaProps {
  input: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
  isLoading: boolean
  disabled: boolean
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export default function ChatInputArea({
  input,
  onChange,
  onSend,
  isLoading,
  disabled,
  inputRef,
}: ChatInputAreaProps) {
  return (
    <div className="border-t border-white/30 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70">
      <div className="flex gap-3">
        <Input
          ref={inputRef}
          value={input}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          placeholder="Ask about projects, impact, or experience…"
          className="h-14 rounded-2xl border border-white/40 bg-white/90 px-5 text-base shadow focus:ring-2 focus:ring-cyan-400/40 dark:border-slate-700/60 dark:bg-slate-900/80"
          disabled={isLoading}
        />
        <Button
          onClick={onSend}
          disabled={disabled}
          className="h-14 w-14 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 p-0 shadow-lg hover:from-cyan-700 hover:to-indigo-700 disabled:opacity-60"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Send className="h-6 w-6" />
            </motion.div>
          ) : (
            <Send className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  )
}
