"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Card } from "@/components/ui/card";
import ChatToggleButton from "./widget/ChatToggleButton";
import ChatHeader from "./widget/ChatHeader";
import ChatMessageList from "./widget/ChatMessageList";
import ChatInput from "./widget/ChatInput";

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
        <ChatToggleButton onClick={() => setIsOpen(true)} />
      ) : (
        <Card className="w-[320px] md:w-[400px] h-[550px] flex flex-col bg-gray-900 border-gray-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-500 rounded-[2rem]">
          <ChatHeader onMinimize={() => setIsOpen(false)} onClose={() => setIsOpen(false)} />
          
          <ChatMessageList 
            messages={messages}
            isLoading={isLoading}
            clientId={clientId}
            messagesEndRef={messagesEndRef}
          />

          <ChatInput 
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
        </Card>
      )}
    </div>
  );
};
