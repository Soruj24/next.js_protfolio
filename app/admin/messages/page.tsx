"use client";

import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import { Send, User, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminMessagesPage() {
  interface Conversation {
    _id: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
  }
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  interface Message {
    _id?: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();

    // Subscribe to notifications to update conversation list in real-time
    const channel = pusherClient.subscribe("notifications-admin");
    channel.bind("new-message-notification", () => {
      fetchConversations();
    });

    return () => {
      pusherClient.unsubscribe("notifications-admin");
    };
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetchMessages(selectedId);

      const participants = [selectedId, "admin"].sort().join("-");
      const chatChannel = pusherClient.subscribe(`chat-${participants}`);

      chatChannel.bind("new-message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        pusherClient.unsubscribe(`chat-${participants}`);
      };
    }
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/chat/conversations");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setConversations(data);
        } else {
          console.error("Conversations API returned non-array data:", data);
          setConversations([]);
        }
      }
    } catch (error) {
      toast.error("Failed to load conversations");
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (clientId: string) => {
    try {
      const res = await fetch(
        `/api/chat/history?senderId=admin&receiverId=${clientId}`
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Chat history API returned non-array data:", data);
          setMessages([]);
        }
      }
    } catch (error) {
      toast.error("Failed to load messages");
      setMessages([]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && selectedId) {
      try {
        const res = await fetch("/api/chat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: input,
            senderId: "admin",
            receiverId: selectedId,
          }),
        });
        if (res.ok) {
          setInput("");
        }
      } catch (error) {
        toast.error("Failed to send message");
      }
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar - Conversations List */}
      <div className="w-96 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="text-cyan-400" size={20} />
            Transmissions
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search frequencies..."
              className="pl-11 bg-black/40 border-white/10 text-white h-12 rounded-2xl focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Scanning Waves...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gray-600">
                <MessageSquare size={24} />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No active transmissions detected.
              </p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => setSelectedId(conv._id)}
                className={cn(
                  "p-6 border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/5 relative group",
                  selectedId === conv._id &&
                    "bg-cyan-500/10 border-l-4 border-l-cyan-500 shadow-[inset_10px_0_20px_-10px_rgba(6,182,212,0.1)]"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white text-sm">
                    NODE_{conv._id.substring(0, 8).toUpperCase()}
                  </span>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    {new Date(conv.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate font-medium">
                  {conv.lastMessage}
                </p>
                {conv.unreadCount > 0 && (
                  <div className="absolute right-6 bottom-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                      {conv.unreadCount} NEW
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl relative">
        {selectedId ? (
          <>
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <User className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    Client Node: {selectedId.substring(0, 8).toUpperCase()}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                      Active Link Established
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-white hover:bg-white/5 rounded-xl"
              >
                Terminal View
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === "admin";
                return (
                  <div
                    key={msg._id || idx}
                    className={cn(
                      "flex flex-col max-w-[80%] transition-all duration-500 animate-in fade-in slide-in-from-bottom-2",
                      isMe ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed",
                        isMe
                          ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/10 rounded-tr-none"
                          : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] font-black text-gray-600 mt-2 uppercase tracking-widest px-2">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/10 focus-within:border-cyan-500/50 transition-all"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your transmission..."
                  className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="h-12 w-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group">
              <MessageSquare className="h-10 w-10 text-gray-700 group-hover:text-cyan-500 transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Select a Node
            </h3>
            <p className="text-gray-500 max-w-xs font-medium">
              Choose a client transmission from the list to establish a secure
              communication link.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
