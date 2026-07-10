"use client";
import { type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  as?: "div" | "article" | "section";
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(6,182,212,0.15)",
  as: Tag = "div",
}: GlowCardProps) {
  return (
    <Tag
      className={`relative group glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_-12px_var(--glow)] ${className}`}
      style={{ "--glow": glowColor } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
