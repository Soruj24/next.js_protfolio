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
    <CardHeader className="bg-gradient-to-b from-white/70 to-white/40 dark:from-slate-900/80 dark:to-slate-900/60 border-b border-white/20 dark:border-slate-700/50 p-3 sm:p-4 flex flex-row items-center justify-between shrink-0 backdrop-blur">
      <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-cyan-700 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white text-sm sm:text-base font-semibold flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        Soruj AI
      </CardTitle>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
