import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IProject } from "@/types";
import Image from "next/image";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import ProjectLinks from "./ProjectLinks";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: IProject;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(cardRef);

  const handleClick = () => {
    const projectId = project.id || (project as { _id?: string })._id;
    if (projectId) router.push(`/projects/${projectId}`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.1, ease: "power3.out", scrollTrigger: { trigger: cardRef.current, start: "top 90%" } },
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white/[0.03] backdrop-blur-2xl rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80" />

        <div className="absolute top-5 left-5 right-5 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
        </div>
      </div>

      <div className="p-8 relative">
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <h3 className="text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-bold text-cyan-500/80 bg-cyan-500/5 px-2.5 py-1 rounded-md border border-cyan-500/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
