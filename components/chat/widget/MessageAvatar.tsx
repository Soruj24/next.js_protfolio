import React from "react"
import { cn } from "@/lib/utils"
import { User as UserIcon, Bot } from "lucide-react"

export default function MessageAvatar({ role }: { role: "user" | "assistant" }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        role === "user"
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          : "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 dark:from-blue-900/50 dark:to-purple-900/50"
      )}
    >
      {role === "user" ? <UserIcon className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
    </div>
  )
}
