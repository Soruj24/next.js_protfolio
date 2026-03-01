import React from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import MessageAvatar from "./MessageAvatar"
import MessageBubble from "./MessageBubble"
import WelcomeSection from "./WelcomeSection"
import TypingIndicator from "./TypingIndicator"

interface Msg {
  id: string
  role: "user" | "assistant"
  content: string
}

interface Action {
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
}

export default function MessagesList({
  messages,
  isLoading,
  showWelcome,
  actions,
  onSelect,
  viewportRef,
  containerRef,
  bottomRef,
  onCopy,
}: {
  messages: Msg[]
  isLoading: boolean
  showWelcome: boolean
  actions: Action[]
  onSelect: (prompt: string) => void
  viewportRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  bottomRef: React.RefObject<HTMLDivElement | null>
  onCopy: (text: string) => void
}) {
  return (
    <div className="relative flex-1 overflow-hidden">
      <ScrollArea className="h-full" viewportRef={viewportRef}>
        <div className="space-y-8 p-6 pb-24" ref={containerRef}>
          {showWelcome && <WelcomeSection actions={actions} onSelect={onSelect} />}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn("flex gap-4", msg.role === "user" && "flex-row-reverse")}
            >
              <MessageAvatar role={msg.role} />
              <MessageBubble
                role={msg.role}
                content={msg.content}
                onCopy={msg.role === "assistant" ? () => onCopy(msg.content) : undefined}
              />
            </motion.div>
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={bottomRef} className="h-px w-full" />
        </div>
      </ScrollArea>
    </div>
  )
}
