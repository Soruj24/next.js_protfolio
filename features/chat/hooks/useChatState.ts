"use client";

import { useState, useEffect, useCallback, RefObject } from "react";
import { toast } from "sonner";
import type { Message } from "@/types/chat";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I am Soruj Mahmud, a Frontend Developer. How can I help you?",
  timestamp: new Date(),
};

function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem("portfolioChat");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0
        ? parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }))
        : [WELCOME_MESSAGE];
    }
  } catch {}
  return [WELCOME_MESSAGE];
}

export function useChatState(scrollRefs?: {
  viewportRef: RefObject<HTMLDivElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("portfolioChat", JSON.stringify(messages));
    }
  }, [messages]);

  const isAtBottom = useCallback(() => {
    const viewport = scrollRefs?.viewportRef?.current;
    if (!viewport) return true;
    const { scrollHeight, scrollTop, clientHeight } = viewport;
    return scrollHeight - scrollTop - clientHeight <= 50;
  }, [scrollRefs]);

  const scrollToBottom = useCallback(() => {
    const bottom = scrollRefs?.bottomRef?.current;
    if (bottom) {
      bottom.scrollIntoView({ block: "end" });
    }
  }, [scrollRefs]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
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

        if (isAtBottom()) {
          requestAnimationFrame(() => requestAnimationFrame(() => scrollToBottom()));
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Oops! I'm having trouble connecting right now. Please try again in a moment or email Soruj directly. 😊",
          timestamp: new Date(),
        },
      ]);
      toast.error("Connection issue", { description: "I'll be back soon!" });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isAtBottom, scrollToBottom]);

  const sendQuick = useCallback((prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      const chatInput = document.querySelector("[data-chat-input] textarea, [data-chat-input] input") as HTMLInputElement;
      if (chatInput) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        nativeInputValueSetter?.call(chatInput, prompt);
        chatInput.dispatchEvent(new Event("input", { bubbles: true }));
        const form = chatInput.closest("form");
        if (form) form.requestSubmit();
      }
    }, 100);
  }, []);

  const clearChat = useCallback(() => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    setMessages([
      { id: "welcome", role: "assistant", content: `${greeting}! 👋\n\nI'm Soruj AI, ready for a new chat!`, timestamp: new Date() },
    ]);
    localStorage.removeItem("portfolioChat");
  }, []);

  const copyMessage = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", { description: "Message copied to clipboard" });
    } catch {
      toast.error("Copy failed", { description: "Try selecting the text manually" });
    }
  }, []);

  return {
    input,
    setInput,
    messages,
    isLoading,
    sendMessage,
    sendQuick,
    clearChat,
    copyMessage,
  };
}
