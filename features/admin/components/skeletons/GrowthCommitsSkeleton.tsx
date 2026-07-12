export default function GrowthCommitsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="space-y-1">
            <div className="h-4 w-32 bg-white/5 rounded-lg" />
            <div className="h-3 w-44 bg-white/[0.03] rounded-lg" />
          </div>
        </div>
        <div className="h-[240px] bg-white/[0.02] rounded-xl" />
      </div>
      <div className="lg:col-span-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="divide-y divide-white/[0.04]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4">
              <div className="w-8 h-8 rounded-full bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-56 bg-white/5 rounded-lg" />
                <div className="flex gap-2">
                  <div className="h-2.5 w-14 bg-white/[0.03] rounded-lg" />
                  <div className="h-2.5 w-14 bg-white/[0.03] rounded-lg" />
                  <div className="h-2.5 w-12 bg-white/[0.03] rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
