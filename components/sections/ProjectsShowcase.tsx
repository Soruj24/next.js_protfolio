// Update the ProjectsShowcase component
import { useState, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModal";
import { IProject } from "@/types";

function ProjectsShowcase() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
        className="min-h-screen py-32 relative overflow-hidden bg-[#020617]"
      >
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle
            title="Project Arsenal"
            subtitle={`${projects.length}+ production-ready AI solutions and intelligent ecosystems architected with precision.`}
          />

          <div className="mt-20 mb-16 space-y-10">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-[2rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  placeholder="Query projects by name, tech, or functionality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-8 py-6 bg-white/[0.03] border border-white/10 rounded-[2rem] focus:border-cyan-500/50 focus:outline-none text-white transition-all duration-500 backdrop-blur-3xl text-lg font-medium placeholder:text-gray-600"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-gray-500">
                  <span className="text-xs font-mono tracking-widest uppercase hidden md:block">
                    Search Database
                  </span>
                  <span className="text-xl">⌕</span>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleProjects(8);
                  }}
                  className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-500 border ${
                    selectedCategory === category
                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {category}
                  <span
                    className={`ml-2 text-[10px] opacity-50 ${selectedCategory === category ? "text-black" : "text-cyan-400"}`}
                  >
                    {category === "All"
                      ? projects.length
                      : projects.filter((p) => p.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

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

          {visibleProjects < filteredProjects.length && (
            <div className="text-center mt-24">
              <button
                onClick={loadMore}
                className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-white transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                <span className="relative flex items-center">
                  Load Additional Assets
                  <span className="ml-2 group-hover:rotate-180 transition-transform duration-500">
                    ↓
                  </span>
                </span>
              </button>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
              <div className="text-5xl mb-6 opacity-20">∅</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No matching intelligence found
              </h3>
              <p className="text-gray-500 font-medium">
                Adjust your parameters and try again.
              </p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                label: "Total Intelligence",
                value: projects.length,
                color: "text-cyan-400",
              },
              {
                label: "Production Ready",
                value: projects.filter((p) => p.status === "completed").length,
                color: "text-green-400",
              },
              {
                label: "Tech Stacks",
                value: new Set(projects.flatMap((p) => p.technologies)).size,
                color: "text-blue-400",
              },
              {
                label: "Domain Reach",
                value: new Set(projects.map((p) => p.category)).size,
                color: "text-purple-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.02] rounded-[2rem] p-8 border border-white/5 backdrop-blur-xl"
              >
                <div className={`text-4xl font-black mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
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
