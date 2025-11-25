// Update the ProjectsShowcase component
import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import MagneticButton from "../ui/MagneticButton";
import ProjectModal from "../ui/ProjectModal"; 
import { projects } from "../../data/projects";
import { IProject } from "@/types";

function ProjectsShowcase() {
  const [visibleProjects, setVisibleProjects] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  const loadMore = () => setVisibleProjects((prev) => prev + 8);

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
        className="min-h-screen py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle
            title="Featured Projects"
            subtitle={`${projects.length}+ innovative solutions across AI, Web, Mobile, Blockchain, and IoT domains`}
          />

          <div className="mb-12 space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by name, description, technology, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500 focus:outline-none text-white transition-all duration-300 backdrop-blur-lg hover:bg-white/10 focus:bg-white/10 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleProjects(8);
                  }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-cyan-500 text-white shadow-2xl shadow-cyan-500/25 transform scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category} (
                  {category === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === category).length}
                  )
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {projectsToShow.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>

          {visibleProjects < filteredProjects.length && (
            <div className="text-center mt-16">
              <MagneticButton
                onClick={loadMore}
                className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                📂 Load More Projects (
                {filteredProjects.length - visibleProjects} remaining)
              </MagneticButton>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="text-3xl font-bold text-cyan-400">
                {projects.length}
              </div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="text-3xl font-bold text-green-400">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-gray-400">Completed Projects</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="text-3xl font-bold text-blue-400">
                {new Set(projects.map((p) => p.category)).size}
              </div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="text-3xl font-bold text-purple-400">
                {
                  projects
                    .flatMap((p) => p.technologies)
                    .filter((tech, index, arr) => arr.indexOf(tech) === index)
                    .length
                }
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
          </div>
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
