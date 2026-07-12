import { cn } from "@/lib/utils";
import { STATUS_BADGES } from "@/features/admin/data/inbox";

export default function InboxStatusBadge({ status }: { status: string }) {
  const badge = STATUS_BADGES[status] || STATUS_BADGES.pending;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", badge.bg, badge.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", badge.dot)} />
      {status}
    </span>
  );
}
