import Link from "next/link";
import { MessageSquare, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecentInquiries({ messages }: { messages: any[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Recent Inquiries</h3>
          {messages.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
              {messages.length}
            </span>
          )}
        </div>
        <Link
          href="/admin/inquiries"
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
        >
          View all
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {messages.length > 0 ? (
          <div className="divide-y divide-white/[0.04]">
            {messages.map((msg: any) => (
              <div
                key={msg._id}
                className="flex items-center gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <User size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                    <span className="text-[10px] text-gray-600 font-semibold shrink-0 ml-3">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate font-medium">{msg.message}</p>
                </div>
                {msg.status !== "read" && (
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <MessageSquare size={20} className="text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 font-medium text-center">No inquiries yet</p>
            <p className="text-xs text-gray-600 font-medium text-center mt-1">Messages will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
