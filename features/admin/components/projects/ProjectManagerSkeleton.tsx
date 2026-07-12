export default function ProjectManagerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-white/5 rounded-xl" />
          <div className="h-4 w-96 bg-white/[0.03] rounded-lg" />
        </div>
        <div className="h-12 w-40 bg-white/5 rounded-xl" />
      </div>
      <div className="h-14 bg-white/[0.02] rounded-2xl border border-white/[0.06]" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-white/[0.02] rounded-xl border border-white/[0.06]" />
        ))}
      </div>
    </div>
  );
}
