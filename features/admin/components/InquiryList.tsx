"use client";
import { Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Inquiry } from "@/types/admin";

interface InquiryListProps {
  inquiries: Inquiry[];
  filteredInquiries: Inquiry[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedInquiry: Inquiry | null;
  setSelectedInquiry: (inq: Inquiry) => void;
}

export default function InquiryList({
  filteredInquiries, loading, searchQuery, setSearchQuery,
  selectedInquiry, setSelectedInquiry,
}: InquiryListProps) {
  return (
    <div className="w-96 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Mail className="text-cyan-400" size={20} />
          Contact Inquiries
        </h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 bg-black/40 border-white/10 text-white h-12 rounded-2xl focus:border-cyan-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500" />
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Loading Inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gray-600">
              <Mail size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500">No inquiries found.</p>
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              onClick={() => setSelectedInquiry(inq)}
              className={cn(
                "p-6 border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/5 relative group",
                selectedInquiry?._id === inq._id && "bg-cyan-500/10 border-l-4 border-l-cyan-500"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm truncate max-w-[150px]">{inq.name}</span>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-cyan-400 font-bold mb-1 truncate">{inq.subject}</p>
              <p className="text-[10px] text-gray-500 truncate font-medium">{inq.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
