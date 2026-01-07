"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { IProject } from "@/types";

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Error deleting project");
    }
  };

  if (loading) return <div className="text-white">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
          <Link href="/admin/projects/new">
            <Plus className="mr-2" size={18} />
            Add New Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project._id || project.id}
            className="bg-gray-800 border-gray-700 text-white overflow-hidden flex flex-col"
          >
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-xl font-bold truncate pr-2">
                  {project.title}
                </span>
                <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">
                  {project.category}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] text-gray-500">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-700">
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-8 border-gray-600 hover:bg-gray-700"
                  >
                    <Link href={`/admin/projects/edit/${project._id || project.id}`}>
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8"
                    onClick={() => handleDelete((project._id || project.id) as string)}
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
