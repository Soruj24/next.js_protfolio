"use client";

import { Download } from "lucide-react";

interface ResumeLinkProps {
  url?: string;
  label?: string;
  className?: string;
}

export default function ResumeLink({
  url = "/resume/print",
  label = "Download Resume",
  className,
}: ResumeLinkProps) {
  if (!url) return null;

  const isExternal = !url.startsWith("/");

  return (
    <a
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-emerald-800 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-900 active:scale-[0.98] transition-all shadow-sm"
      }
    >
      <Download size={16} />
      {label}
    </a>
  );
}
