"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SCROLL_THRESHOLD = 50;

export function useChatScroll(deps: { isLoading: boolean; messagesLength: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const isAtBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return true;
    const { scrollHeight, scrollTop, clientHeight } = viewport;
    return scrollHeight - scrollTop - clientHeight <= SCROLL_THRESHOLD;
  }, []);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "auto" = "smooth") => {
      const viewport = viewportRef.current;
      if (viewport && behavior === "auto") {
        viewport.scrollTop = viewport.scrollHeight + 100;
      } else if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior, block: "end" });
      }
      isUserScrolledUp.current = false;
      setShowScrollButton(false);
      setHasNewMessages(false);
    },
    []
  );

  const handleScroll = useCallback(() => {
    const atBottom = isAtBottom();
    isUserScrolledUp.current = !atBottom;
    setShowScrollButton(!atBottom);
    if (atBottom) setHasNewMessages(false);
  }, [isAtBottom]);

  // Scroll event listener
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // ResizeObserver for content changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      if (!isUserScrolledUp.current) {
        scrollToBottom(deps.isLoading ? "auto" : "smooth");
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [deps.isLoading, scrollToBottom]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (!isUserScrolledUp.current) {
      scrollToBottom(deps.isLoading ? "auto" : "smooth");
    } else if (deps.messagesLength > 1) {
      setHasNewMessages(true);
    }
  }, [deps.messagesLength, deps.isLoading, scrollToBottom]);

  return {
    viewportRef,
    containerRef,
    bottomRef,
    showScrollButton,
    hasNewMessages,
    scrollToBottom,
  };
}
