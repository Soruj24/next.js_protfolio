"use client";
import SkillForm from "@/components/admin/SkillForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewSkillPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-3xl font-bold text-white">Add New Skill Category</h1>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-xl backdrop-blur-sm">
        <SkillForm 
          onSuccess={() => router.push("/admin/skills")} 
        />
      </div>
    </div>
  );
}
