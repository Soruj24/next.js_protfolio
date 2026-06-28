import SectionTitle from "@/components/shared/SectionTitle";
import ProfessionalPagination from "@/features/admin/components/Pagination";
import ProjectFilters from "@/features/projects/components/ProjectFilters";
import ProjectStats from "@/features/projects/components/ProjectStats";
import ProjectEmptyState from "@/features/projects/components/ProjectEmptyState";
import ProjectsBackground from "@/features/projects/components/ProjectsBackground";
import ProjectsGrid from "@/features/projects/components/ProjectsGrid";
import { usePublicProjects } from "@/features/projects/hooks/usePublicProjects";

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
  } = usePublicProjects();
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  return (
    <>
      <section
        id="projects"
        className="min-h-screen py-20 md:py-32 relative overflow-hidden bg-[#020617] scroll-mt-20 sm:scroll-mt-28"
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

          <ProjectsGrid projects={projectsToShow} />

          <ProfessionalPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProjects.length}
            itemsPerPage={ITEMS_PER_PAGE}
            color="cyan"
          />

          {filteredProjects.length === 0 && <ProjectEmptyState />}

        </div>
      </section>
    </>
  );
}

export default ProjectsShowcase;
