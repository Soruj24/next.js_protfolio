"use client";
import { Trash2, User, Clock, AlertCircle, MessageSquare, Mail as MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Inquiry } from "@/types/admin";

interface InquiryDetailProps {
  inquiry: Inquiry;
  onDelete: (id: string) => void;
}

export default function InquiryDetail({ inquiry, onDelete }: InquiryDetailProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-white/10 bg-white/5">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
              <User className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{inquiry.name}</h2>
              <p className="text-cyan-400 font-bold text-sm tracking-wide">{inquiry.email}</p>
            </div>
          </div>
          <Button
            variant="ghost" size="icon"
            onClick={() => onDelete(inquiry._id)}
            className="h-12 w-12 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all"
          >
            <Trash2 size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
            <Clock className="text-gray-500" size={18} />
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Received At</p>
              <p className="text-sm font-bold text-white">{new Date(inquiry.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
            <AlertCircle className="text-gray-500" size={18} />
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</p>
              <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">{inquiry.status || "Unread"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Subject Line</h3>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xl font-bold text-white leading-relaxed">{inquiry.subject}</p>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Transmission Content</h3>
            <div className="p-8 bg-black/40 rounded-[32px] border border-white/10 min-h-[200px]">
              <p className="text-gray-300 font-medium leading-[1.8] whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <MessageSquare className="text-cyan-400" size={20} />
            </div>
            <p className="text-sm text-gray-400 font-medium">
              Reply to this inquiry by clicking the email address above to open your mail client.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
