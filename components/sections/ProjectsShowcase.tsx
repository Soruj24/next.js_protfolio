import { useState, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModal";
import { IProject } from "@/types";
import ProfessionalPagination from "@/components/admin/Pagination";
import ProjectFilters from "../projects/ProjectFilters";
import ProjectStats from "../projects/ProjectStats";
import ProjectEmptyState from "../projects/ProjectEmptyState";
import ProjectsBackground from "../projects/ProjectsBackground";

const ITEMS_PER_PAGE = 6;

function ProjectsShowcase() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          console.error("Projects API returned non-array data:", data);
          setProjects([]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    "All",
    ...new Set(Array.isArray(projects) ? projects.map((project) => project.category) : []),
  ];

  const filteredProjects = Array.isArray(projects) 
    ? projects.filter((project) => {
        const matchesCategory =
          selectedCategory === "All" || project.category === selectedCategory;
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (project.technologies && project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
          (project.tags && project.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));
        return matchesCategory && matchesSearch;
      })
    : [];

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const projectsToShow = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleProjectClick = (project: IProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section
        id="projects"
        className="min-h-screen py-32 relative overflow-hidden bg-[#020617]"
      >
        <ProjectsBackground />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle
            title="Project Arsenal"
            subtitle={`${projects.length}+ production-ready AI solutions and intelligent ecosystems architected with precision.`}
          />

          <ProjectFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            projects={projects}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
            {projectsToShow.map((project, index) => (
              <ProjectCard
                key={project._id || project.id || index}
                project={project}
                index={index}
                onProjectClick={handleProjectClick}
              />
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

          {filteredProjects.length === 0 && <ProjectEmptyState />}

          <ProjectStats projects={projects} />
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default ProjectsShowcase;
