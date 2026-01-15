"use client";
import ProjectForm from "@/components/admin/ProjectForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Deploy New <span className="text-cyan-400">Project</span></h1>
          <p className="text-sm text-gray-500 font-medium">Initialize a new technical node in your portfolio matrix.</p>
        </div>
      </div>

      <div className="relative">
        <ProjectForm 
          onSuccess={() => router.push("/admin/projects")} 
        />
      </div>
    </div>
  );
}
