import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { Contact, IContact, IContactDocument } from "@/models/Contact";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban, Users, MessageSquare, TrendingUp } from "lucide-react";

async function getDashboardData() {
  await connectDB();
  const [projectCount, userCount, messageCount, recentMessages] =
    await Promise.all([
      Project.countDocuments(),
      User.countDocuments(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
  return {
    projectCount,
    userCount,
    messageCount,
    recentMessages: JSON.parse(JSON.stringify(recentMessages)),
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const cards = [
    {
      title: "Total Projects",
      value: data.projectCount,
      icon: FolderKanban,
      color: "text-blue-500",
    },
    {
      title: "Total Users",
      value: data.userCount,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Messages",
      value: data.messageCount,
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, Admin</h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="bg-gray-800 border-gray-700 text-white"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {card.title}
              </CardTitle>
              <card.icon className={card.color} size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentMessages.length > 0 ? (
              <div className="space-y-4">
                {data.recentMessages.map((msg: IContactDocument) => (
                  <div
                    key={msg._id.toString()}
                    className="border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-cyan-400">
                        {msg.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-200 mb-1">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent messages found.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">All projects are up to date.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
