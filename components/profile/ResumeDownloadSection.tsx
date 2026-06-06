import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";

export default function ResumeDownloadSection({
  resumeRef,
}: {
  resumeRef: React.RefObject<{ generatePDF: () => void; isGenerating: boolean } | null>;
}) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6 bg-white/[0.02]">
        <div>
          <CardTitle className="text-2xl font-bold text-white">Dynamic Portfolio CV</CardTitle>
          <CardDescription className="text-gray-400 mt-1">
            Smart professional resume generated from your settings.
          </CardDescription>
        </div>
        <Button
          size="lg"
          onClick={() => resumeRef.current?.generatePDF()}
          disabled={resumeRef.current?.isGenerating}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold gap-3 shadow-xl shadow-cyan-500/20 disabled:opacity-50 h-12 px-8 rounded-xl transition-all hover:scale-105"
        >
          {resumeRef.current?.isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          Download CV
        </Button>
      </CardHeader>
    </Card>
  );
}
