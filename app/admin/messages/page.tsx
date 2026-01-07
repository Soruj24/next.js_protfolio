"use client";

import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import { Send, User, Search } from "lucide-react";
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
        setConversations(data);
      }
    } catch (error) {
      toast.error("Failed to load conversations");
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
        setMessages(data);
      }
    } catch (error) {
      toast.error("Failed to load messages");
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
    <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden">
      {/* Sidebar - Conversations List */}
      <Card className="w-80 bg-gray-800 border-gray-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search chats..."
              className="pl-9 bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No messages yet</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => setSelectedId(conv._id)}
                className={cn(
                  "p-4 border-b border-gray-700/50 cursor-pointer transition-colors hover:bg-gray-700/50",
                  selectedId === conv._id &&
                    "bg-cyan-900/20 border-l-4 border-l-cyan-500"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-white text-sm truncate max-w-[120px]">
                    ID: {conv._id.substring(0, 8)}...
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(conv.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {conv.lastMessage}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="inline-block bg-cyan-600 text-white text-[10px] px-1.5 py-0.5 rounded-full mt-2">
                    {conv.unreadCount} new
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Main Chat Window */}
      <Card className="flex-1 bg-gray-800 border-gray-700 flex flex-col overflow-hidden">
        {selectedId ? (
          <>
            <div className="p-4 border-b border-gray-700 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-900/50 flex items-center justify-center">
                <User className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h2 className="text-white font-semibold">
                  Client {selectedId.substring(0, 8)}
                </h2>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />{" "}
                  Online
                </span>
              </div>
            </div>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className={cn(
                    "flex flex-col max-w-[70%]",
                    msg.senderId === "admin"
                      ? "ml-auto items-end"
                      : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm shadow-sm",
                      msg.senderId === "admin"
                        ? "bg-cyan-600 text-white rounded-tr-none"
                        : "bg-gray-700 text-gray-200 rounded-tl-none"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <div className="p-4 border-t border-gray-700">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your reply..."
                  className="bg-gray-900 border-gray-700 text-white focus-visible:ring-cyan-500"
                />
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-4">
            <div className="h-20 w-20 rounded-full bg-gray-700/50 flex items-center justify-center">
              <User className="h-10 w-10 text-gray-600" />
            </div>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </Card>
    </div>
  );
}
