import { Card, CardContent } from "@/components/ui/card";
import type { IStat } from "@/types";

const StatsGrid = ({ stats }: { stats: IStat[] }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group cursor-default"
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl bg-gray-900/50 ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
