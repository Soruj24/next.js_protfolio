import ProjectCard from "@/components/ui/ProjectCard";
import type { IProject } from "@/types";

interface ProjectsGridProps {
  projects: IProject[];
  onProjectClick: (project: IProject) => void;
}

export default function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id || project.id || index}
          project={project}
          index={index}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  );
}
