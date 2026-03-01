import { useEffect, useMemo, useState } from "react";
import type { IProject } from "@/types";

const ITEMS_PER_PAGE = 6;

export function useProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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
          setProjects([]);
        }
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        Array.isArray(projects) ? projects.map((project) => project.category) : [],
      ),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    const term = searchTerm.toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const inTitle = project.title.toLowerCase().includes(term);
      const inDesc = project.description.toLowerCase().includes(term);
      const inTech =
        Array.isArray(project.technologies) &&
        project.technologies.some((tech) => tech.toLowerCase().includes(term));
      const inTags =
        Array.isArray(project.tags) &&
        project.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && (inTitle || inDesc || inTech || inTags);
    });
  }, [projects, selectedCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
    [filteredProjects.length],
  );

  const projectsToShow = useMemo(
    () =>
      filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredProjects, currentPage],
  );

  return {
    // data
    projects,
    isLoading,
    categories,
    filteredProjects,
    projectsToShow,
    // pagination
    currentPage,
    setCurrentPage,
    totalPages,
    // filters
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    // constants
    ITEMS_PER_PAGE,
  };
}

