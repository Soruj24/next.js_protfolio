export default function ScoreCardsSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-36 bg-white/5 rounded-lg animate-pulse" />
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse">
            <div className="flex items-center gap-5">
              <div className="w-[100px] h-[100px] rounded-full bg-white/5" />
              <div className="space-y-3">
                <div className="h-3 w-24 bg-white/5 rounded-lg" />
                <div className="h-5 w-20 bg-white/5 rounded-lg" />
                <div className="h-3 w-36 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
