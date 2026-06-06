import { IPerformanceStats } from "@/models/Project";

interface ModalPerformanceProps {
  performance: IPerformanceStats;
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
        <div className={`${color} h-1.5 sm:h-2 rounded-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default function ModalPerformance({ performance }: ModalPerformanceProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📊 Performance</h3>
      <div className="space-y-2 sm:space-y-3">
        <Bar label="Load Time" value={performance.loadTime || 0} color="bg-green-500" />
        <Bar label="Accessibility" value={performance.accessibility || 0} color="bg-blue-500" />
        <Bar label="Best Practices" value={performance.bestPractices || 0} color="bg-purple-500" />
        <Bar label="SEO" value={performance.seo || 0} color="bg-yellow-500" />
      </div>
    </div>
  );
}
