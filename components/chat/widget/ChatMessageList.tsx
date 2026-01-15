import React from "react";
import { cn } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";

interface Message {
  id?: string;
  content: string;
  senderId: string;
  timestamp: string | number | Date;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  clientId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  clientId,
  messagesEndRef,
}) => {
  return (
    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 bg-gray-900/50">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-sm italic">Transmission channel open. Send a message to begin.</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={cn(
              "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.senderId === clientId ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div
              className={cn(
                "px-4 py-2.5 rounded-2xl text-sm shadow-md",
                msg.senderId === clientId
                  ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none"
                  : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
              )}
            >
              {msg.content}
            </div>
            <span className="text-[10px] text-gray-500 mt-1.5 px-1 font-mono">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </CardContent>
  );
};

export default ChatMessageList;
