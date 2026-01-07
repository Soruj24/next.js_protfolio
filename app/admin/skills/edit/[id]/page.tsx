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

  if (loading) return <div className="text-white">Loading category...</div>;

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
        <h1 className="text-3xl font-bold text-white">Edit Skill Category</h1>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-xl backdrop-blur-sm">
        <SkillForm
          category={category}
          onSuccess={() => router.push("/admin/skills")}
        />
      </div>
    </div>
  );
}
