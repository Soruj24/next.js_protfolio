export default function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-36 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 animate-pulse"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="w-16 h-6 rounded-full bg-white/5" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 bg-white/5 rounded-lg" />
            <div className="h-8 w-16 bg-white/5 rounded-lg" />
            <div className="h-3 w-32 bg-white/[0.03] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
