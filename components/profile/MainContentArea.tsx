import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, User } from "lucide-react";
import { Session } from "next-auth";
import ProfileDetailsCard from "./ProfileDetailsCard";
import AccountStatsCard from "./AccountStatsCard";
import ResumeDownloadSection from "./ResumeDownloadSection";
import ActivityLogPanel from "./ActivityLogPanel";

interface Props {
  activeSection: string;
  isAdmin: boolean;
  setting: ISettings;
  session: Session | null;
  resumeRef: React.RefObject<{ generatePDF: () => void; isGenerating: boolean } | null>;
}

import { ISettings } from "@/models/Settings";

const MainContentArea = ({ activeSection, isAdmin, session, resumeRef }: Props) => {
  return (
    <div className="lg:col-span-3">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-8 flex w-fit">
          <TabsTrigger value="overview" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
            <User className="w-4 h-4 mr-2" /> Overview
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="resume" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
              <FileText className="w-4 h-4 mr-2" /> Professional CV
            </TabsTrigger>
          )}
          <TabsTrigger value="activity" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
            <Calendar className="w-4 h-4 mr-2" /> Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileDetailsCard session={session} />
            <AccountStatsCard />
          </div>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="resume" className="mt-0 focus-visible:outline-none">
            <ResumeDownloadSection resumeRef={resumeRef} />
          </TabsContent>
        )}

        <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
          <ActivityLogPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentArea;
