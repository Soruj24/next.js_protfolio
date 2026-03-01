"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  HelpCircle,
  Briefcase,
  Mail,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { toast } from "sonner";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ChatHeader from "./ChatHeader";
import ChatInputArea from "./ChatInputArea";
import NudgeBanner from "./NudgeBanner";
import ChatActionBar from "./ChatActionBar";
import MessagesList from "./MessagesList";
import FloatingToggleButton from "./FloatingToggleButton";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  {
    label: "Projects",
    icon: Briefcase,
    prompt: "Show me your best projects",
  },
  {
    label: "Hire Me",
    icon: Sparkles,
    prompt:
      "Create a recruiter-ready summary with key highlights and top 3 projects from Soruj’s portfolio. Include quantified impact (metrics), architecture decisions, performance improvements, and enterprise-aligned tech stack. End with a clear contact CTA.",
  },
  {
    label: "Contact",
    icon: Mail,
    prompt: "How can I contact you directly?",
  },
  {
    label: "Skills",
    icon: HelpCircle,
    prompt: "What technologies do you specialize in?",
  },
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scrolling state
  const isUserScrolledUp = useRef(false);
  const SCROLL_THRESHOLD = 50; // px from bottom to consider "at bottom"

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "auto" = "smooth") => {
      const viewport = viewportRef.current;

      if (viewport) {
        if (behavior === "auto") {
          viewport.scrollTop = viewport.scrollHeight + 100; // Extra padding
        } else if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior, block: "end" });
        }
      }

      // Reset states
      isUserScrolledUp.current = false;
      setShowScrollButton(false);
      setHasNewMessages(false);
    },
    [],
  );

  const isAtBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return true;

    const scrollHeight = viewport.scrollHeight;
    const scrollTop = viewport.scrollTop;
    const clientHeight = viewport.clientHeight;

    // Check if we are within the threshold of the bottom
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    return distanceToBottom <= SCROLL_THRESHOLD;
  }, []);

  const handleScroll = useCallback(() => {
    const atBottom = isAtBottom();
    isUserScrolledUp.current = !atBottom;
    setShowScrollButton(!atBottom);

    // If user scrolled back to bottom, clear unread state
    if (atBottom) {
      setHasNewMessages(false);
    }
  }, [isAtBottom]);

  // ResizeObserver to handle content height changes (like streaming)
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isUserScrolledUp.current) {
        scrollToBottom(isLoading ? "auto" : "smooth");
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isLoading, scrollToBottom]);

  // Auto-scroll when appropriate
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    // If user is at bottom, auto-scroll to show new content
    const shouldScroll = !isUserScrolledUp.current;

    if (shouldScroll) {
      scrollToBottom(isLoading ? "auto" : "smooth");
    } else if (messages.length > 1) {
      // If we didn't scroll but there's a new message, mark as unread
      setHasNewMessages(true);
    }
  }, [messages.length, isLoading, isOpen, isMinimized, scrollToBottom]);

  // Reset on open/maximize or new user message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      isUserScrolledUp.current = false;
      setTimeout(() => scrollToBottom("auto"), 100);
    }
  }, [isOpen, isMinimized, scrollToBottom]);

  // Attach scroll listener
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Nudge after 8 seconds
  useEffect(() => {
    if (!isOpen && messages.length <= 1) {
      const timer = setTimeout(() => setShowNudge(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Hide nudge after 10 seconds of showing
  useEffect(() => {
    if (showNudge) {
      const timer = setTimeout(() => setShowNudge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNudge]);

  // Auto-focus input
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

  // Specialized open event from Contact form
  useEffect(() => {
    const handleSpecialOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);

      // Add a specialized greeting if they just sent a message
      const contactMsg: Message = {
        id: `contact-ack-${Date.now()}`,
        role: "assistant",
        content:
          "I saw you just sent a message through the contact form! Excellent choice. 🚀\n\nWhile Soruj reviews your message, is there anything specific you'd like to know about his projects or technical expertise?",
        timestamp: new Date(),
      };

      setMessages((prev) => {
        // Only add if not already added recently
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.content.includes("contact form")) return prev;
        return [...prev, contactMsg];
      });
    };

    window.addEventListener("openNexusChat", handleSpecialOpen);
    return () => window.removeEventListener("openNexusChat", handleSpecialOpen);
  }, []);

  // Load welcome message & saved chat
  useEffect(() => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";

    const welcome: Message = {
      id: "welcome",
      role: "assistant",
      content: `${greeting}! 👋\n\n## Introduction\nHello! I'm **Nexus**, a portfolio assistant for **Soruj Mahmud**, a professional frontend developer. I'm here to provide information about Soruj's skills, experience, and projects.\n\n## Skills and Expertise\n- **Core Frontend Expertise**: React, Next.js, TypeScript, Modern CSS, State Management\n- **UI/UX & Animations**: Framer Motion, GSAP, UI Components Library, Responsive Layouts\n- **Tooling & Integration**: Frontend Tooling, API Integration, Performance & SEO, Version Control (Git)\n\n## Projects and Experience\n- **Luxe**: Immersive E-Commerce Storefront\n- **Vivid**: Creative Developer Portfolio\n- **Nova**: Real-time Analytics Dashboard\n- **AI-Powered Chatbot Platform**\n- **AI Fitness Tracker & Coach**\n- **Cryptocurrency Trading Dashboard**\n- **Interactive Learning Management System**\n- **Real-time Chat Application**\n\n## Contact Information\n- Email: sorujmahmudb2h@gmail.com\n- Phone: +8801795397598\n- LinkedIn: [linkedin.com/in/soruj-mahmud](https://linkedin.com/in/soruj-mahmud)\n- GitHub: [github.com/soruj-mahmud](https://github.com/soruj-mahmud)\n\nAsk me anything about projects, impact, or experience, and I'll help!`,
      timestamp: new Date(),
    };

    const saved = localStorage.getItem("portfolioChat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(restored.length > 0 ? restored : [welcome]);
        return;
      } catch (err) {
        console.error("Failed to load chat:", err);
      }
    }
    setMessages([welcome]);
  }, []);

  // Persist chat
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("portfolioChat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const opened =
      typeof window !== "undefined" &&
      sessionStorage.getItem("nexusAutoOpen") === "1";
    if (!opened && messages.length <= 1) {
      const t = setTimeout(() => {
        setIsOpen(true);
        setIsMinimized(false);
        try {
          sessionStorage.setItem("nexusAutoOpen", "1");
        } catch {}
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    isUserScrolledUp.current = false; // Always follow user message

    try {
      const res = await fetch("/api/chat/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input.trim(),
          history: messages
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      const botId = Date.now() + "-streaming";

      setMessages((prev) => [
        ...prev,
        { id: botId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.id === botId) last.content = accumulated;
          return updated;
        });

        // Follow streaming if near bottom
        if (isAtBottom()) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToBottom("auto"));
          });
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Oops! I'm having trouble connecting right now. Please try again in a moment or email Soruj directly. 😊",
          timestamp: new Date(),
        },
      ]);
      toast.error("Connection issue", { description: "I'll be back soon!" });
    } finally {
      setIsLoading(false);
      isUserScrolledUp.current = false;
    }
  };

  const sendQuick = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => sendMessage(), 300);
  };

  const clearChat = async () => {
    const result = await Swal.fire({
      title: "Start fresh?",
      text: "This will clear the entire conversation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#1e40af",
    });
    if (!result.isConfirmed) return;

    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `${greeting}! 👋\n\nI'm Nexus, ready for a new chat!`,
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem("portfolioChat");
    Swal.fire({
      title: "Chat cleared",
      text: "Started fresh!",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", { description: "Message copied to clipboard" });
    } catch {
      toast.error("Copy failed", {
        description: "Try selecting the text manually",
      });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[12000] flex flex-col items-end gap-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {/* Friendly nudge */}
        {!isOpen && showNudge && (
          <NudgeBanner
            onOpen={() => {
              setIsOpen(true);
              setShowNudge(false);
            }}
            onDismiss={() => setShowNudge(false)}
          />
        )}

        {/* Main Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95",
              "border border-gray-200/50 dark:border-slate-700/50",
              isMinimized
                ? "w-72 sm:w-80"
                : "w-[95vw] sm:w-[440px] h-[70vh] sm:h-[720px]"
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
                  containerRef={messagesContainerRef}
                  bottomRef={bottomRef}
                  onCopy={copyMessage}
                />

                {/* Input Area */}
                <ChatInputArea
                  input={input}
                  onChange={(e) => setInput(e.target.value)}
                  onSend={sendMessage}
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
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
          setShowNudge(false);
        }}
      />
    </div>
  );
}

export default AIChatBot;
