import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AccountStatsCard() {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Account Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { label: "Member Since", value: "January 2024" },
          { label: "Total Visits", value: "124" },
          { label: "Comments", value: "12" },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-gray-400">{row.label}</span>
            <span className="text-white font-medium">{row.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
