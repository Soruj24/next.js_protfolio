import { Loader2 } from "lucide-react";

export default function Skeleton() {
  return (
    <div className="h-[240px] flex items-center justify-center">
      <Loader2 size={20} className="text-gray-600 animate-spin" />
    </div>
  );
}
