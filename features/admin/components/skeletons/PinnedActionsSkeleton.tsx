export default function PinnedActionsSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-28 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white/[0.02]">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="h-2.5 w-16 bg-white/5 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
