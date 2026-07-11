"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import type { ISkillCategory } from "@/models/Skill";

const ITEMS_PER_PAGE = 4;

export function useSkills() {
  const [categories, setCategories] = useState<ISkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error(`Failed to fetch skills: ${res.status}`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch skills");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const filteredCategories = categories.filter((category) => {
    const matchesCategory = category.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = category.skills.some((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory || matchesSkill;
  });

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  const handleDelete = async (id: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete Skill Category?",
      text: "This category and all its skills will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a2e",
      color: "#e5e7eb",
    });
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill category deleted successfully");
        fetchSkills();
      } else {
        toast.error("Failed to delete category");
      }
    } catch {
      toast.error("Error deleting category");
    }
  };

  return {
    categories, loading, searchQuery, setSearchQuery,
    currentPage, setCurrentPage, totalPages,
    paginatedCategories, handleDelete, ITEMS_PER_PAGE,
  };
}
