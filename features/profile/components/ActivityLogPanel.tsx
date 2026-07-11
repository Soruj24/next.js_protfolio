"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, CheckCircle2, User, Loader2 } from "lucide-react";
import type { IActivity } from "@/models/Activity";

const iconMap: Record<string, typeof Settings> = {
  profile: Settings,
  security: Shield,
  system: CheckCircle2,
  project: User,
  contact: User,
  blog: User,
  analytics: User,
  github: User,
  deployment: User,
};

const colorMap: Record<string, string> = {
  profile: "bg-blue-500",
  security: "bg-cyan-500",
  system: "bg-green-500",
  project: "bg-purple-500",
  contact: "bg-amber-500",
  blog: "bg-purple-500",
  analytics: "bg-pink-500",
  github: "bg-gray-500",
  deployment: "bg-orange-500",
};

function timeAgo(dateStr: string | Date): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityLogPanel() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities?limit=6")
      .then((r) => r.json())
      .then((result) => setActivities(result.data || []))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-6 bg-white/[0.02]">
        <CardTitle className="text-2xl font-bold text-white">Recent Activity</CardTitle>
        <CardDescription className="text-gray-400">
          Track your account actions and system updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8 px-8">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={20} className="text-gray-600 animate-spin" />
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {activities.slice(0, 6).map((activity, idx) => {
              const Icon = iconMap[activity.type] || Settings;
              const color = colorMap[activity.type] || "bg-gray-500";
              return (
                <div key={activity._id || idx} className="relative pl-12 group">
                  <div
                    className={`absolute left-0 top-1 w-9 h-9 ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                      {activity.title}
                    </h4>
                    {activity.createdAt && (
                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        {timeAgo(activity.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
