"use client";

import { Download } from "lucide-react";

/**
 * This now points at the DYNAMIC pdf route instead of a static file in
 * /public. That means: whatever your admin panel last saved to MongoDB
 * is exactly what gets downloaded — no manual file replacement needed.
 */

export default function ResumeDownloadButton() {
  return (
    <a
      href="/api/resume-pdf"
      download="Soruj_Mahmud_Resume.pdf"
      className="inline-flex items-center gap-2 rounded-full bg-emerald-800 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-900 active:scale-[0.98] transition-all shadow-sm"
    >
      <Download size={16} />
      Download Resume
    </a>
  );
}