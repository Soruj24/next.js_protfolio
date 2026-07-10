"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import type { IProject } from "@/types";

const ITEMS_PER_LOAD = 3;

export function useFeaturedProjects() {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setAllProjects(Array.isArray(data) ? data : []);
      } catch {
        setAllProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const cats = allProjects.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [allProjects]);

  const allTechnologies = useMemo(() => {
    const techs = allProjects.flatMap((p) => p.technologies || []);
    return Array.from(new Set(techs)).sort();
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.some((t) =>
          project.technologies?.some((pt) => pt.toLowerCase() === t.toLowerCase())
        );
      const matchesSearch =
        !term ||
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.technologies?.some((t) => t.toLowerCase().includes(term)) ||
        project.tags?.some((t) => t.toLowerCase().includes(term));
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [allProjects, selectedCategory, selectedTech, searchTerm]);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedCategory, selectedTech, searchTerm]);

  const toggleTech = useCallback((tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }, []);

  return {
    allProjects,
    isLoading,
    categories,
    allTechnologies,
    filteredProjects,
    visibleProjects,
    hasMore,
    loadMore,
    selectedCategory,
    setSelectedCategory,
    selectedTech,
    toggleTech,
    searchTerm,
    setSearchTerm,
  };
}
