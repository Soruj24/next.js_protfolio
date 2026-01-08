"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading, clientId, messagesEndRef } = useChat();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg flex items-center justify-center animate-bounce hover:animate-none"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      ) : (
        <Card className="w-80 md:w-96 h-[500px] flex flex-col bg-gray-900 border-gray-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-cyan-900/50 border-b border-gray-700 p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Chat with Admin
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-gray-400 hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <p>Hello! How can I help you today?</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.senderId === clientId ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm",
                      msg.senderId === clientId
                        ? "bg-cyan-600 text-white rounded-tr-none"
                        : "bg-gray-800 text-gray-200 rounded-tl-none"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="bg-gray-800 border-gray-700 text-white focus-visible:ring-cyan-500"
              />
              <Button type="submit" size="icon" className="bg-cyan-600 hover:bg-cyan-700 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};
