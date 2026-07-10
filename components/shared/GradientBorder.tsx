"use client";
import { type ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export default function GradientBorder({
  children,
  className = "",
  gradient = "from-cyan-500 via-purple-500 to-pink-500",
}: GradientBorderProps) {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br ${gradient} ${className}`}>
      <div className="rounded-2xl bg-[#0a0f1e] w-full h-full">
        {children}
      </div>
    </div>
  );
}
