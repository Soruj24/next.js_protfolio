export default function ChartsSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="space-y-1">
            <div className="h-4 w-32 bg-white/5 rounded-lg" />
            <div className="h-3 w-48 bg-white/[0.03] rounded-lg" />
          </div>
        </div>
        <div className="h-[240px] bg-white/[0.02] rounded-xl" />
      </div>
      <div className="lg:col-span-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="flex items-center gap-6">
          <div className="w-[160px] h-[160px] rounded-full bg-white/5" />
          <div className="space-y-3 flex-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/5" />
                <div className="h-3 flex-1 bg-white/5 rounded-lg" />
                <div className="h-3 w-8 bg-white/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
