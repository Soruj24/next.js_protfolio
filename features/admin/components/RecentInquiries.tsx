import Link from "next/link";
import { MessageSquare, User } from "lucide-react";

export default function RecentInquiries({ messages }: { messages: any[] }) {
  return (
    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="text-cyan-400" size={20} />
          Recent Inquiries
        </h2>
        <Link
          href="/admin/inquiries"
          className="text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <div
              key={msg._id}
              className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 group/msg"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover/msg:scale-110 transition-transform">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white truncate">{msg.name}</p>
                  <span className="text-[10px] text-gray-500 font-medium">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-400 truncate font-medium">{msg.message}</p>
              </div>
              {msg.status !== "read" && <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <MessageSquare className="text-gray-600" size={24} />
            </div>
            <p className="text-gray-500 font-medium">No recent messages</p>
          </div>
        )}
      </div>
    </div>
  );
}
