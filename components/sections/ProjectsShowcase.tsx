import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ProjectModal from "../ui/ProjectModal";
import ProfessionalPagination from "@/components/admin/Pagination";
import ProjectFilters from "../projects/ProjectFilters";
import ProjectStats from "../projects/ProjectStats";
import ProjectEmptyState from "../projects/ProjectEmptyState";
import ProjectsBackground from "../projects/ProjectsBackground";
import ProjectsGrid from "../projects/ProjectsGrid";
import { useProjects } from "../projects/useProjects";
import { IProject } from "@/types";

function ProjectsShowcase() {
  const {
    projects,
    categories,
    filteredProjects,
    projectsToShow,
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    ITEMS_PER_PAGE,
  } = useProjects();
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

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
        className="min-h-screen py-20 md:py-32 relative overflow-hidden bg-[#020617]"
      >
        <ProjectsBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionTitle
            title="Project Arsenal"
            subtitle={`${projects.length}+ production-ready frontend applications and digital experiences architected with precision.`}
          />

          <ProjectFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            projects={projects}
          />

          <ProjectsGrid
            projects={projectsToShow}
            onProjectClick={handleProjectClick}
          />

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
