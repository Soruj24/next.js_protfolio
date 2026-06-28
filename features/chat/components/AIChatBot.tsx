"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useChatState, useChatScroll } from "@/features/chat/hooks";
import { useChatUI, QUICK_ACTIONS } from "@/features/chat/hooks/useChatUI";
import ChatHeader from "./ChatHeader";
import ChatInputArea from "./ChatInputArea";
import NudgeBanner from "./NudgeBanner";
import ChatActionBar from "./ChatActionBar";
import MessagesList from "./MessagesList";
import FloatingToggleButton from "./FloatingToggleButton";

export function AIChatBot() {
  const {
    input, setInput, messages, isLoading,
    sendMessage, sendQuick, clearChat, copyMessage,
  } = useChatState();

  const {
    viewportRef, containerRef, bottomRef,
  } = useChatScroll({ isLoading, messagesLength: messages.length });

  const {
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    showNudge, setShowNudge,
    inputRef,
    handleSend,
  } = useChatUI({ messagesLength: messages.length, sendMessage });

  return (
    <div
      className="fixed bottom-4 right-6 z-[12000] flex flex-col items-end gap-1"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {!isOpen && showNudge && (
          <NudgeBanner
            onOpen={() => { setIsOpen(true); setShowNudge(false); }}
            onDismiss={() => setShowNudge(false)}
          />
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "dark flex flex-col overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(6,182,212,0.25)] backdrop-blur-2xl",
              "bg-gradient-to-br from-[#0b1220]/95 via-[#0d1627]/90 to-[#0b1220]/95 border border-white/10",
              "ring-1 ring-inset ring-cyan-500/20",
              isMinimized ? "w-72 sm:w-80" : "w-[95vw] sm:w-[440px] h-[70vh] sm:h-[720px]",
            )}
          >
            <ChatHeader
              onClose={() => setIsOpen(false)}
              onMinimize={() => setIsMinimized(!isMinimized)}
            />

            {!isMinimized && (
              <>
                <MessagesList
                  messages={messages}
                  isLoading={isLoading}
                  showWelcome={messages.length <= 1}
                  actions={QUICK_ACTIONS}
                  onSelect={sendQuick}
                  viewportRef={viewportRef}
                  containerRef={containerRef}
                  bottomRef={bottomRef}
                  onCopy={copyMessage}
                />

                <ChatInputArea
                  input={input}
                  onChange={(e) => setInput(e.target.value)}
                  onSend={handleSend}
                  isLoading={isLoading}
                  disabled={!input.trim() || isLoading}
                  inputRef={inputRef}
                />

                <ChatActionBar
                  onClear={clearChat}
                  onHelp={() => sendQuick("How does this chat work?")}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingToggleButton
        isOpen={isOpen}
        unreadCount={Math.max(0, messages.length - 1)}
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); setShowNudge(false); }}
      />
    </div>
  );
}

export default AIChatBot;
