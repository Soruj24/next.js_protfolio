"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ISkillCategory } from "@/models/Skill";
import { Input } from "@/components/ui/input";
import ProfessionalPagination from "@/components/admin/Pagination";

const ITEMS_PER_PAGE = 4;

export default function AdminSkills() {
  const [categories, setCategories] = useState<ISkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) {
        throw new Error(`Failed to fetch skills: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Skills API returned non-array data:", data);
        setCategories([]);
      }
    } catch {
      toast.error("Failed to fetch skills");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const filteredCategories = categories.filter(category => {
    const matchesCategory = category.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = category.skills.some(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory || matchesSkill;
  });

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Technical Skills</h1>
          <p className="text-gray-400 font-medium">Manage your technical expertise categories</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105">
          <Link href="/admin/skills/new">
            <Plus className="mr-2" size={20} />
            Add New Category
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <div className="flex-1 w-full max-w-xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
          <Input 
            placeholder="Search categories or specific skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border-white/10 pl-12 h-14 rounded-2xl text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedCategories.map((category) => (
             <div
               key={category._id}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
            >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {category.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                        {category.skills.length} Technical Nodes
                      </span>
                      {(category as any).isLocal && (
                        <span className="text-[8px] px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full font-black uppercase tracking-tighter">
                          Static
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-xl"
                  >
                    <Link href={`/admin/skills/edit/${category._id}`}>
                      <Pencil size={18} />
                    </Link>
                  </Button>
                  {!(category as any).isLocal && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 p-0 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl"
                      onClick={() => category._id && handleDelete(category._id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/node hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl group-hover/node:scale-125 transition-transform duration-300">{skill.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{skill.name}</div>
                        <div className="text-[10px] text-gray-500 font-medium">{skill.description || 'Core Technology'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-purple-400 w-8">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProfessionalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredCategories.length}
        itemsPerPage={ITEMS_PER_PAGE}
        color="purple"
      />

      {filteredCategories.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/10 rounded-[40px]">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
            <Search className="text-gray-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No categories found</h3>
          <p className="text-gray-500 font-medium max-w-xs text-center">
            Try searching for a different category or skill name.
          </p>
          <Button 
            variant="link" 
            onClick={() => setSearchQuery("")}
            className="text-purple-400 font-bold mt-4"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
