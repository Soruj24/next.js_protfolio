"use client";
import { Mail } from "lucide-react";

export default function InquiryEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group">
        <Mail className="h-10 w-10 text-gray-700 group-hover:text-cyan-500 transition-colors duration-500" />
      </div>
      <h3 className="text-2xl font-black text-white mb-2">Select an Inquiry</h3>
      <p className="text-gray-500 max-w-xs font-medium">
        Choose a contact form submission from the list to view full details and manage the transmission.
      </p>
    </div>
  );
}
