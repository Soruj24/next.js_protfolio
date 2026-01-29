"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DynamicResume from "@/components/ui/DynamicResume";
import { ArrowLeft, Share2, Printer } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ResumePage() {
  const resumeRef = useRef<{ generatePDF: () => void }>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Soruj Mahmud - Frontend Developer CV",
        text: "Check out Soruj Mahmud's professional frontend development resume.",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
            >
              <Share2 size={16} className="text-cyan-400" />
              Share
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
            >
              <Printer size={16} className="text-purple-400" />
              Print
            </button>
          </div>
        </div>

        {/* Hero Section for Resume Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Professional <span className="text-gradient">Curriculum Vitae</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            A comprehensive overview of my technical expertise, professional journey, and key contributions in frontend engineering.
          </p>
        </motion.div>

        {/* Resume Preview & Download Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-3xl -z-10" />
          
          <div className="p-6 sm:p-10 flex flex-col items-center">
            {/* The actual resume component with its own download button */}
            <div className="w-full flex justify-center mb-10">
              <DynamicResume ref={resumeRef} />
            </div>

            {/* Additional info for the user */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-10 border-t border-white/5">
              <div className="text-center sm:text-left">
                <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Format</h3>
                <p className="text-gray-500 text-xs">Professional PDF Document</p>
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Version</h3>
                <p className="text-gray-500 text-xs">Latest Update - {new Date().getFullYear()}</p>
              </div>
              <div className="text-center sm:text-right">
                <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Availability</h3>
                <p className="text-gray-500 text-xs">Ready for new opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <p className="text-center text-gray-500 text-sm mt-12">
          &copy; {new Date().getFullYear()} Soruj Mahmud. All rights reserved.
        </p>
      </div>
    </main>
  );
}
