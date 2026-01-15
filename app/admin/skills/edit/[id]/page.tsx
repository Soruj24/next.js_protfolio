"use client";
import { useState, useEffect } from "react";
import SkillForm from "@/components/admin/SkillForm";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ISkillCategory } from "@/models/Skill";

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState<ISkillCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/skills/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategory(data);
      } catch {
        toast.error("Error loading category");
        router.push("/admin/skills");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchCategory();
  }, [params.id, router]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
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
          <h1 className="text-3xl font-black text-white tracking-tight">Sync <span className="text-purple-400">Category</span></h1>
          <p className="text-sm text-gray-500 font-medium text-uppercase tracking-widest">CATEGORY ID: {params.id}</p>
        </div>
      </div>

      <div className="relative">
        <SkillForm
          category={category}
          onSuccess={() => router.push("/admin/skills")}
        />
      </div>
    </div>
  );
}
