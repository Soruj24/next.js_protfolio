import { IProject } from "@/types"; 

const PerformanceMetrics = ({ project }: { project: IProject }) => {
  return (
    <div>
      {" "}
      {project.performance && (
        <section className="project-section p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6">Performance</h3>
          <div className="space-y-6">
            {Object.entries(project.performance).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="capitalize text-gray-400">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-cyan-400 font-bold">{value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PerformanceMetrics;
