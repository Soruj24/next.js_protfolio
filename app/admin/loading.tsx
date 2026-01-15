export default function AdminLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 w-48 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[400px] bg-white/5 border border-white/10 rounded-3xl" />
        <div className="space-y-8">
          <div className="h-48 bg-white/5 border border-white/10 rounded-3xl" />
          <div className="h-48 bg-white/5 border border-white/10 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
