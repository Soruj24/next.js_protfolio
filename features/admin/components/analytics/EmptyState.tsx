import { FolderOpen } from "lucide-react";

export default function EmptyState({ message = "No data yet" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
        <FolderOpen size={20} className="text-gray-600" />
      </div>
      <p className="text-xs text-gray-500 font-medium">{message}</p>
    </div>
  );
}
