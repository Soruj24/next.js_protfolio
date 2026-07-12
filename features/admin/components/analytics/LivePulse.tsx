export default function LivePulse({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </div>
      <span className="text-xs font-bold text-emerald-400">{count} live</span>
    </div>
  );
}
