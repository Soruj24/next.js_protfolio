import React from "react";
import { X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onMinimize }) => {
  return (
    <CardHeader className="bg-cyan-900/50 border-b border-gray-700 p-4 flex flex-row items-center justify-between shrink-0">
      <CardTitle className="text-white text-lg flex items-center gap-2">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        Connect With Me
      </CardTitle>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="h-8 w-8 text-gray-400 hover:text-white transition-colors"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
