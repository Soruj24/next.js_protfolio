export default function AnalyticsOverviewSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-36 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="space-y-2 flex-1">
              <div className="h-2 w-16 bg-white/5 rounded-lg" />
              <div className="h-6 w-24 bg-white/5 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-12 bg-white/5 rounded-lg" />
              <div className="flex items-end gap-[2px] h-6">
                {[...Array(7)].map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 rounded-full bg-white/5"
                    style={{ height: `${15 + Math.random() * 85}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
