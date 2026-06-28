import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, CheckCircle2, User } from "lucide-react";

const activities = [
  { title: "Profile Settings Updated", time: "2 hours ago", icon: Settings, color: "bg-blue-500" },
  { title: "Account Activity Monitored", time: "Yesterday at 4:30 PM", icon: Shield, color: "bg-cyan-500" },
  { title: "Security Credentials Verified", time: "3 days ago", icon: CheckCircle2, color: "bg-green-500" },
  { title: "New Session Initiated", time: "1 week ago", icon: User, color: "bg-purple-500" },
];

export default function ActivityLogPanel() {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-6 bg-white/[0.02]">
        <CardTitle className="text-2xl font-bold text-white">Recent Activity</CardTitle>
        <CardDescription className="text-gray-400">
          Track your account actions and system updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8 px-8">
        <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {activities.map((activity, idx) => (
            <div key={idx} className="relative pl-12 group">
              <div
                className={`absolute left-0 top-1 w-9 h-9 ${activity.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <activity.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1 font-medium">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
