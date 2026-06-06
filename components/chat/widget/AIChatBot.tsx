"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Briefcase,
  Mail,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatState, Message, useChatScroll } from "@/hooks/chat";
import ChatHeader from "./ChatHeader";
import ChatInputArea from "./ChatInputArea";
import NudgeBanner from "./NudgeBanner";
import ChatActionBar from "./ChatActionBar";
import MessagesList from "./MessagesList";
import FloatingToggleButton from "./FloatingToggleButton";

const QUICK_ACTIONS = [
  { label: "Projects", icon: Briefcase, prompt: "Show me your best projects" },
  {
    label: "Hire Me",
    icon: Sparkles,
    prompt: "Create a recruiter-ready summary with key highlights and top 3 projects from Soruj's portfolio. Include quantified impact (metrics), architecture decisions, performance improvements, and enterprise-aligned tech stack. End with a clear contact CTA.",
  },
  { label: "Contact", icon: Mail, prompt: "How can I contact you directly?" },
  { label: "Skills", icon: HelpCircle, prompt: "What technologies do you specialize in?" },
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  const {
    input, setInput, messages, isLoading,
    sendMessage, sendQuick, clearChat, copyMessage,
  } = useChatState();

  const {
    viewportRef, containerRef, bottomRef, showScrollButton, hasNewMessages,
  } = useChatScroll({ isLoading, messagesLength: messages.length });

  const inputRef = useRef<HTMLInputElement>(null);

  // Nudge after 5s
  useEffect(() => {
    if (!isOpen && messages.length <= 1) {
      const timer = setTimeout(() => setShowNudge(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Hide nudge after 10s
  useEffect(() => {
    if (showNudge) {
      const timer = setTimeout(() => setShowNudge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNudge]);

  // Auto-focus
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isMinimized) setIsOpen(false);
        else setIsMinimized(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isMinimized]);

  // Special open event from contact form
  useEffect(() => {
    const handleSpecialOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener("openNexusChat", handleSpecialOpen);
    return () => window.removeEventListener("openNexusChat", handleSpecialOpen);
  }, []);

  // Auto-open on first visit
  useEffect(() => {
    const opened = typeof window !== "undefined" && sessionStorage.getItem("nexusAutoOpen") === "1";
    if (!opened && messages.length <= 1) {
      const t = setTimeout(() => {
        setIsOpen(true);
        setIsMinimized(false);
        try { sessionStorage.setItem("nexusAutoOpen", "1"); } catch {}
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [messages.length]);

  const handleSend = useCallback(() => {
    sendMessage();
  }, [sendMessage]);

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
