import { Monitor, Smartphone, Tablet } from "lucide-react";

export default function DeviceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("desktop") || lower.includes("pc")) return <Monitor size={14} className="text-cyan-400" />;
  if (lower.includes("mobile") || lower.includes("phone")) return <Smartphone size={14} className="text-purple-400" />;
  return <Tablet size={14} className="text-amber-400" />;
}
