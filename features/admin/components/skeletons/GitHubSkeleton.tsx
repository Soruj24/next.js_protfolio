export default function GitHubSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-36 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white/5 mx-auto" />
            <div className="h-5 w-12 bg-white/5 rounded-lg mx-auto" />
            <div className="h-2.5 w-14 bg-white/[0.03] rounded-lg mx-auto" />
          </div>
        ))}
      </div>
      <div className="flex gap-[3px] mb-5">
        {[...Array(140)].map((_, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.03]" />
        ))}
      </div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-t border-white/[0.04]">
            <div className="w-7 h-7 rounded-lg bg-white/5" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-64 bg-white/5 rounded-lg" />
              <div className="flex gap-2">
                <div className="h-2.5 w-14 bg-white/[0.03] rounded-lg" />
                <div className="h-2.5 w-14 bg-white/[0.03] rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
