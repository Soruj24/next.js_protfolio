"use client";
import { useState, useEffect } from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IProject } from "@/models/Project";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        toast.error("Error loading project");
        router.push("/admin/projects");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProject();
  }, [params.id, router]);

  if (loading) return <div className="text-white">Loading project...</div>;

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
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-xl backdrop-blur-sm">
        <ProjectForm
          project={project}
          onSuccess={() => router.push("/admin/projects")}
        />
      </div>
    </div>
  );
}
