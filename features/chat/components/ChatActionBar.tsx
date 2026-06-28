import React from "react";
import { Trash2, HelpCircle } from "lucide-react";

export default function ChatActionBar({
  onClear,
  onHelp,
}: {
  onClear: () => void;
  onHelp: () => void;
}) {
  return (
    <div className="mt-5 mr-5 ml-3 mb-2  flex items-center justify-between text-sm text-gray-500">
      <button
        onClick={onClear}
        className="flex items-center gap-2 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" /> Clear chat
      </button>
      <button
        onClick={onHelp}
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
      >
        <HelpCircle className="h-4 w-4" /> Help
      </button>
    </div>
  );
}
