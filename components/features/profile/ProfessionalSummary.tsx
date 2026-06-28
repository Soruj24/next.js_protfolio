import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISettings } from "@/models/Settings";
import { Code, Sparkles } from "lucide-react";
 
const ProfessionalSummary = ({ settings }: { settings: ISettings }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pt-24 md:pt-20">
      <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
        <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
          <CardTitle className="text-xl flex items-center font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            <Sparkles className="w-5 h-5 mr-3 text-cyan-400 animate-pulse" />
            Professional Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-300 leading-relaxed text-lg italic font-medium">
            "
            {settings?.experience?.focus ||
              "As an aspiring developer, I am dedicated to mastering modern web technologies and building impactful digital experiences."}
            "
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Professional Experience
              </p>
              <p className="text-sm text-gray-200">
                {settings?.experience?.professional_experience ||
                  "Entry-level professional with strong project background."}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Project Focus
              </p>
              <p className="text-sm text-gray-200">
                {settings?.experience?.project_experience ||
                  "Full-stack development with a focus on interactive frontend features."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
        <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
          <CardTitle className="text-xl flex items-center font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            <Code className="w-5 h-5 mr-3 text-cyan-400" />
            Core Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {(
              settings?.technical_skills?.specializations || [
                "Full Stack",
                "Performance Optimization",
                "React",
                "Next.js",
                "Node.js",
              ]
            ).map((spec, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all hover:scale-105"
              >
                {spec}
              </Badge>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Top Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                settings?.technical_skills?.core_technologies?.slice(0, 6) || [
                  "TypeScript",
                  "MongoDB",
                  "Tailwind",
                ]
              ).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalSummary;
