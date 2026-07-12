export default function DeploymentsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-40 bg-white/5 rounded-lg" />
        </div>
        <div className="divide-y divide-white/[0.04]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-48 bg-white/5 rounded-lg" />
                <div className="flex gap-2">
                  <div className="h-2.5 w-16 bg-white/[0.03] rounded-lg" />
                  <div className="h-2.5 w-16 bg-white/[0.03] rounded-lg" />
                  <div className="h-2.5 w-20 bg-white/[0.03] rounded-lg" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-white/5 rounded-lg" />
                <div className="h-2.5 w-20 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="space-y-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4">
              <div className="w-8 h-8 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-36 bg-white/5 rounded-lg" />
                <div className="h-2.5 w-48 bg-white/[0.03] rounded-lg" />
                <div className="h-2 w-16 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
