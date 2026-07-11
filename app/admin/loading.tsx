export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Welcome skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="h-3 w-24 bg-white/5 rounded-full" />
        </div>
        <div className="h-10 w-96 bg-white/5 rounded-xl" />
        <div className="h-4 w-[500px] bg-white/5 rounded-lg" />
        <div className="h-3 w-48 bg-white/[0.03] rounded-lg" />
      </div>

      {/* Stat Cards */}
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

      {/* Analytics Overview */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-36 bg-white/5 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="space-y-2 flex-1">
                <div className="h-2 w-16 bg-white/5 rounded-lg" />
                <div className="h-6 w-24 bg-white/5 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-12 bg-white/5 rounded-lg" />
                <div className="flex items-end gap-[2px] h-6">
                  {[...Array(7)].map((_, j) => (
                    <div key={j} className="w-1.5 rounded-full bg-white/5" style={{ height: `${15 + Math.random() * 85}%` }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-36 bg-white/5 rounded-lg animate-pulse" />
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse">
              <div className="flex items-center gap-5">
                <div className="w-[100px] h-[100px] rounded-full bg-white/5" />
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-white/5 rounded-lg" />
                  <div className="h-5 w-20 bg-white/5 rounded-lg" />
                  <div className="h-3 w-36 bg-white/[0.03] rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <div className="space-y-1">
              <div className="h-4 w-32 bg-white/5 rounded-lg" />
              <div className="h-3 w-48 bg-white/[0.03] rounded-lg" />
            </div>
          </div>
          <div className="h-[240px] bg-white/[0.02] rounded-xl" />
        </div>
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <div className="h-4 w-32 bg-white/5 rounded-lg" />
          </div>
          <div className="flex items-center gap-6">
            <div className="w-[160px] h-[160px] rounded-full bg-white/5" />
            <div className="space-y-3 flex-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/5" />
                  <div className="h-3 flex-1 bg-white/5 rounded-lg" />
                  <div className="h-3 w-8 bg-white/5 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
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

      {/* Deployments + Updates */}
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

      {/* GitHub */}
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

      {/* Growth + Commits */}
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

      {/* Pinned Actions */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-28 bg-white/5 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="h-2.5 w-16 bg-white/5 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
