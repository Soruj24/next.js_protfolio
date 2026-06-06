import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckCircle2 } from "lucide-react";
import { Session } from "next-auth";

export default function ProfileDetailsCard({ session }: { session: Session | null }) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Profile Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Display Name</p>
          <p className="text-white font-medium">{session?.user?.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</p>
          <p className="text-white font-medium">{session?.user?.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Status</p>
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Verified User
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
