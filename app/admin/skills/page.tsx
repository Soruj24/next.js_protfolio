"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ISkillCategory } from "@/models/Skill";

export default function AdminSkills() {
  const [categories, setCategories] = useState<ISkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?"))
      return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill category deleted successfully");
        fetchSkills();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  if (loading) return <div className="text-white">Loading skills...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Skills</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/skills/new">
            <Plus className="mr-2" size={18} />
            Add New Category
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="bg-gray-800 border-gray-700 text-white"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <CardTitle>{category.title}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-600 hover:bg-gray-700"
                >
                  <Link href={`/admin/skills/edit/${category._id}`}>
                    <Pencil size={14} className="mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8"
                  onClick={() => category._id && handleDelete(category._id)}
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10"
                  >
                    <span>{skill.icon}</span>
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-[10px] text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
