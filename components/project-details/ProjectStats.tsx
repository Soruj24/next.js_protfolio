import { IProject } from "@/types"; 

const ProjectStats = ({ project }: { project: IProject }) => {
  return (
    <section className="project-section p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-6">Project Insights</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-white/5">
          <span className="text-gray-400">Duration</span>
          <span className="font-medium">
            {project.duration || project.stats?.completionTime}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-white/5">
          <span className="text-gray-400">Team Size</span>
          <span className="font-medium">
            {project.teamSize || project.stats?.teamSize}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-white/5">
          <span className="text-gray-400">Complexity</span>
          <span className="font-medium text-cyan-400">
            {project.stats?.complexity}
          </span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-400">Completion</span>
          <span className="font-medium">
            {typeof project.completionDate === "string"
              ? project.completionDate
              : project.completionDate instanceof Date
                ? project.completionDate.toLocaleDateString()
                : ""}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectStats;
