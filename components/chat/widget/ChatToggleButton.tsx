import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg flex items-center justify-center animate-bounce hover:animate-none transition-all duration-300"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};

export default ChatToggleButton;
