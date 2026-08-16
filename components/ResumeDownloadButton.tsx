"use client";

import { Download } from "lucide-react";

export default function ResumeDownloadButton({
  className,
}: {
  className?: string;
}) {
  return (
    <a
      href="/resume/print"
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-emerald-800 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-900 active:scale-[0.98] transition-all shadow-sm"
      }
    >
      <Download size={16} />
      Download Resume
    </a>
  );
}
