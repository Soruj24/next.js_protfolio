"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Briefcase, Mail, Sparkles, HelpCircle } from "lucide-react"

export const QUICK_ACTIONS = [
  { label: "Projects", icon: Briefcase, prompt: "Show me your best projects" },
  {
    label: "Hire Me",
    icon: Sparkles,
    prompt: "Create a recruiter-ready summary with key highlights and top 3 projects from Soruj's portfolio. Include quantified impact (metrics), architecture decisions, performance improvements, and enterprise-aligned tech stack. End with a clear contact CTA.",
  },
  { label: "Contact", icon: Mail, prompt: "How can I contact you directly?" },
  { label: "Skills", icon: HelpCircle, prompt: "What technologies do you specialize in?" },
]

interface UseChatUIOptions {
  messagesLength: number
  sendMessage: () => void
}

export function useChatUI({ messagesLength, sendMessage }: UseChatUIOptions) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen && messagesLength <= 1) {
      const timer = setTimeout(() => setShowNudge(true), 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, messagesLength])

  useEffect(() => {
    if (showNudge) {
      const timer = setTimeout(() => setShowNudge(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [showNudge])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isMinimized) setIsOpen(false)
        else setIsMinimized(true)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, isMinimized])

  useEffect(() => {
    const handleSpecialOpen = () => {
      setIsOpen(true)
      setIsMinimized(false)
    }
    window.addEventListener("openNexusChat", handleSpecialOpen)
    return () => window.removeEventListener("openNexusChat", handleSpecialOpen)
  }, [])

  useEffect(() => {
    const opened = typeof window !== "undefined" && sessionStorage.getItem("nexusAutoOpen") === "1"
    if (!opened && messagesLength <= 1) {
      const t = setTimeout(() => {
        setIsOpen(true)
        setIsMinimized(false)
        try { sessionStorage.setItem("nexusAutoOpen", "1") } catch {}
      }, 1500)
      return () => clearTimeout(t)
    }
  }, [messagesLength])

  const handleSend = useCallback(() => {
    sendMessage()
  }, [sendMessage])

  return {
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    showNudge, setShowNudge,
    inputRef,
    handleSend,
  }
}
