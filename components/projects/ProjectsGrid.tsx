import ProjectCard from "@/components/ui/ProjectCard";
import type { IProject } from "@/types";

interface ProjectsGridProps {
  projects: IProject[];
  onProjectClick: (project: IProject) => void;
}

export default function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
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

