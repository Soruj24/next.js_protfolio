export function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse ${className}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-full bg-white/[0.03] rounded-lg" />
          <div className="h-3 w-3/4 bg-white/[0.03] rounded-lg" />
          <div className="h-3 w-1/2 bg-white/[0.03] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-32 bg-white/5 rounded-lg" />
      </div>
      <div className="h-[240px] bg-white/[0.02] rounded-xl" />
    </div>
  );
}

export function WidgetSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-32 bg-white/5 rounded-lg" />
      </div>
      <div className="p-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-white/5 rounded-lg" />
              <div className="h-2.5 w-48 bg-white/[0.03] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
