export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="h-3 w-24 bg-white/5 rounded-full" />
        </div>
        <div className="h-9 w-80 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 h-[320px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
        <div className="lg:col-span-4 h-[320px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 h-[360px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
        <div className="lg:col-span-4 h-[360px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
        <div className="lg:col-span-3 space-y-4">
          <div className="h-[180px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
          <div className="h-[160px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="h-[320px] rounded-2xl bg-white/[0.02] border border-white/[0.06]" />
    </div>
  );
}
