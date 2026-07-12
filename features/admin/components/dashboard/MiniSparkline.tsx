import { cn } from "@/lib/utils";

export default function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-[2px] h-6">
      {data.map((val, i) => {
        const height = ((val - min) / range) * 100;
        return (
          <div
            key={i}
            className={cn("w-1.5 rounded-full transition-all duration-500", color)}
            style={{
              height: `${Math.max(height, 15)}%`,
              opacity: i === data.length - 1 ? 1 : 0.4 + (i / data.length) * 0.6,
            }}
          />
        );
      })}
    </div>
  );
}
