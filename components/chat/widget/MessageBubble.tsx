import React from "react"
import { cn } from "@/lib/utils"
import MarkdownRenderer from "./MarkdownRenderer"
import { Copy } from "lucide-react"

interface MessageBubbleProps {
  role: "user" | "assistant"
  content: string
  onCopy?: () => void
}

export default function MessageBubble({ role, content, onCopy }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-3xl px-6 py-5 text-base leading-relaxed",
        role === "user"
          ? "rounded-br-none bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          : "rounded-bl-none bg-white text-gray-800 shadow-md border border-gray-200/60 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700/60"
      )}
    >
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </div>

      {role === "assistant" && onCopy && (
        <button
          onClick={onCopy}
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-slate-400 dark:hover:text-white"
        >
          <Copy className="h-4 w-4" /> Copy
        </button>
      )}
    </div>
  )
}
