"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function SuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center py-12"
    >
      {/* Circle animation */}
      <div className="relative w-20 h-20 mb-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute inset-2 rounded-full bg-emerald-500/15"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 12 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        {/* Ripple rings */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-emerald-500/30"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0.4 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-emerald-500/20"
        />
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg font-semibold text-white mb-2"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-500 text-center max-w-xs"
      >
        Thank you for reaching out. I&apos;ll get back to you within 24 hours.
      </motion.p>
    </motion.div>
  );
}
