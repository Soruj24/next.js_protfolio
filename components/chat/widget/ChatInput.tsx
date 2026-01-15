import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend }) => {
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-md shrink-0">
      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="bg-gray-800/50 border-gray-700 text-white focus-visible:ring-cyan-500 rounded-xl placeholder:text-gray-500"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim()}
          className="bg-cyan-600 hover:bg-cyan-700 shrink-0 rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
