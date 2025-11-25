import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Add this import
import type { IProject } from "../../types";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: IProject;
  index: number;
  onProjectClick: (project: IProject) => void;
}

function ProjectCard({ project, index, onProjectClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Generate gradient based on category
  const getCategoryGradient = (category: string) => {
    const gradients = {
      ai: "from-purple-500 to-pink-500",
      fullstack: "from-blue-500 to-cyan-500",
      mobile: "from-green-500 to-emerald-500",
      frontend: "from-orange-500 to-red-500",
      backend: "from-gray-600 to-blue-600",
      blockchain: "from-yellow-500 to-orange-500",
    };
    return (
      gradients[category as keyof typeof gradients] ||
      "from-cyan-500 to-blue-500"
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-500/20 text-green-400",
      "in-progress": "bg-yellow-500/20 text-yellow-400",
    };
    return (
      colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400"
    );
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-500/20 text-green-400",
      intermediate: "bg-yellow-500/20 text-yellow-400",
      advanced: "bg-red-500/20 text-red-400",
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      "bg-gray-500/20 text-gray-400"
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 100,
          rotationY: 90,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (imageRef.current) {
        imageRef.current.addEventListener("mouseenter", () => {
          gsap.to(imageRef.current, {
            rotationY: 180,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        imageRef.current.addEventListener("mouseleave", () => {
          gsap.to(imageRef.current, {
            rotationY: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      }

      if (linksRef.current) {
        cardRef.current?.addEventListener("mouseenter", () => {
          gsap.to(Array.from(linksRef.current?.children || []), {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          });
        });

        cardRef.current?.addEventListener("mouseleave", () => {
          gsap.to(Array.from(linksRef.current?.children || []), {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
          });
        });
      }
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group cursor-pointer">
      <div
        className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 h-full group-hover:shadow-2xl group-hover:shadow-cyan-500/10 overflow-hidden"
        onClick={() => onProjectClick(project)}
      >
        {/* Project Image/Emoji */}
        <div className="flex items-center justify-between mb-4">
          <div
            ref={imageRef}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryGradient(
              project.category
            )} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg`}
          >
            {project.emoji}
          </div>

          <div className="flex flex-col items-end space-y-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                project.status
              )}`}
            >
              {project.status === "in-progress" ? "In Progress" : "Completed"}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                project.difficulty
              )}`}
            >
              {project.difficulty}
            </span>
          </div>
        </div>

        {/* Project Title and Description */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>⏱️ {project.duration}</span>
          <span>👥 {project.teamSize}</span>
          <span className="text-cyan-400">❤️ {project.stats.likes}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/10 hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              {feature}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="px-2 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400">
              +{project.features.length - 3}
            </span>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
          <div ref={linksRef} className="flex space-x-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors transform translate-y-5 opacity-0 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors transform translate-y-5 opacity-0 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Code
              </a>
            )}
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
          <div className="absolute inset-[2px] rounded-3xl bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;