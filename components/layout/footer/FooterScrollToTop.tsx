"use client";
import { ArrowUp } from "lucide-react";

const FooterScrollToTop: React.FC = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default FooterScrollToTop;
