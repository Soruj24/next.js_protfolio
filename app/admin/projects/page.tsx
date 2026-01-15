"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ExternalLink, Github, Search, Filter } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { IProject } from "@/types";
import { Input } from "@/components/ui/input";
import ProfessionalPagination from "@/components/admin/Pagination";

const ITEMS_PER_PAGE = 6;

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Projects API returned non-array data:", data);
        setProjects([]);
      }
    } catch {
      toast.error("Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory]);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

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
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Project Intelligence</h1>
          <p className="text-gray-400 font-medium">Manage and deploy your technical portfolio</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
          <Link href="/admin/projects/new">
            <Plus className="mr-2" size={20} />
            Deploy New Intelligence
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <div className="flex-1 w-full max-w-xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
          <Input 
            placeholder="Search projects by title or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border-white/10 pl-12 h-14 rounded-2xl text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                filterCategory === cat 
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20" 
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProjects.map((project) => (
          <div
            key={project._id || project.id}
            className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{project.emoji || "🚀"}</span>
                <h3 className="text-xl font-bold text-white truncate">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 px-2 py-1 rounded-md border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-bold text-gray-500 self-center">
                    +{project.technologies.length - 3} MORE
                  </span>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/20"
                      title="View Source"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/20"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl"
                  >
                    <Link href={`/admin/projects/edit/${project._id || project.id}`}>
                      <Pencil size={18} />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl"
                    onClick={() => handleDelete((project._id || project.id) as string)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProfessionalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProjects.length}
        itemsPerPage={ITEMS_PER_PAGE}
        color="cyan"
      />

      {filteredProjects.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/10 rounded-[40px]">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
            <Search className="text-gray-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-gray-500 font-medium max-w-xs text-center">
            Try adjusting your search query or filter to find what you're looking for.
          </p>
          <Button 
            variant="link" 
            onClick={() => {setSearchQuery(""); setFilterCategory("All")}}
            className="text-cyan-400 font-bold mt-4"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
