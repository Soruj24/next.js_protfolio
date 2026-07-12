export default function WelcomeSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="h-3 w-24 bg-white/5 rounded-full" />
      </div>
      <div className="h-10 w-96 bg-white/5 rounded-xl" />
      <div className="h-4 w-[500px] bg-white/5 rounded-lg" />
      <div className="h-3 w-48 bg-white/[0.03] rounded-lg" />
    </div>
  );
}
