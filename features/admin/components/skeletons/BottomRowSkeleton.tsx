export default function BottomRowSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="divide-y divide-white/[0.04]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-white/5 rounded-lg" />
                <div className="h-2.5 w-48 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-28 bg-white/5 rounded-lg" />
        </div>
        <div className="space-y-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4">
              <div className="w-8 h-8 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-40 bg-white/5 rounded-lg" />
                <div className="h-2.5 w-56 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-lg bg-white/5" />
            <div className="h-4 w-24 bg-white/5 rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-white/5" />
                <div className="h-2.5 w-14 bg-white/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <div className="h-4 w-28 bg-white/5 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-white/5" />
                  <div className="h-3 w-24 bg-white/5 rounded-lg" />
                </div>
                <div className="h-3 w-16 bg-white/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
