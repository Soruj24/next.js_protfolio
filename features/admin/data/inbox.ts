import type { StatusFilter } from "@/features/admin/hooks/useInbox";

export const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Messages" },
  { value: "pending", label: "Unread" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
];

export const STATUS_BADGES: Record<string, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-cyan-400/10", text: "text-cyan-400", dot: "bg-cyan-400" },
  read: { bg: "bg-emerald-400/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  replied: { bg: "bg-purple-400/10", text: "text-purple-400", dot: "bg-purple-400" },
  archived: { bg: "bg-gray-400/10", text: "text-gray-400", dot: "bg-gray-400" },
};
