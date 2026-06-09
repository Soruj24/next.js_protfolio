import type { ResumeProject } from "@/types/resume";

interface ResumeProjectsProps {
  projects: ResumeProject[];
}

export default function ResumeProjects({ projects }: ResumeProjectsProps) {
  return (
    <>
      {projects.map((project) => (
        <div key={project.title} className="mb-3 break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <div className="font-bold text-[10.5pt] text-[#222222]">
              {project.title}
            </div>
            <div className="text-right text-[9.5pt] text-[#666666] italic">
              {project.type}
            </div>
          </div>
          <ul className="m-0 pl-[18px]">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="mb-0.75 text-justify">
                {bullet}
              </li>
            ))}
          </ul>
          <div className="text-[9pt] text-[#555555] mt-1 italic">
            <strong>Technologies Used:</strong> {project.technologies}
          </div>
        </div>
      ))}
    </>
  );
}
