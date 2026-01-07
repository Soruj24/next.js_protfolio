import { useEffect, useRef } from "react";
import { gsap } from "gsap"; 
import type { IProject } from "../../types";

interface ProjectModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      
      const ctx = gsap.context(() => {
        // Overlay animation
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        // Modal animation - different animations for mobile/desktop
        const isMobile = window.innerWidth < 768;
        gsap.fromTo(
          modalRef.current,
          { 
            opacity: 0,
            scale: isMobile ? 0.95 : 0.8,
            y: isMobile ? 50 : 100
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          }
        );

        // Content animation
        gsap.fromTo(
          contentRef.current?.children || [],
          { 
            opacity: 0,
            y: 20
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2
          }
        );
      });

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, project]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.8,
        y: isMobile ? 50 : 100,
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onClose
      });
    });

    return () => ctx.revert();
  };

  if (!isOpen || !project) return null;

  const getCategoryGradient = (category: string) => {
    const gradients = {
      ai: "from-purple-500 to-pink-500",
      fullstack: "from-blue-500 to-cyan-500",
      mobile: "from-green-500 to-emerald-500",
      frontend: "from-orange-500 to-red-500",
      backend: "from-gray-600 to-blue-600",
      blockchain: "from-yellow-500 to-orange-500",
    };
    return gradients[category as keyof typeof gradients] || "from-cyan-500 to-blue-500";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-500/20 text-green-400 border-green-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      advanced: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-lg"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-gray-900 rounded-xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r ${getCategoryGradient(
                  project.category
                )} flex items-center justify-center text-xl sm:text-2xl lg:text-3xl shadow-lg flex-shrink-0`}
              >
                {project.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-2 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all duration-300 text-gray-400 hover:text-white flex-shrink-0"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Project Meta */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6">
            <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status === "in-progress" ? "🚧 In Progress" : "✅ Completed"}
            </span>
            <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30">
              ⏱️ {project.duration}
            </span>
            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30">
              👥 {project.teamSize}
            </span>
            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-400 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
              ❤️ {project.stats?.likes || 0}
            </span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Screenshots */}
              {project.screenshots.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📸 Screenshots</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    {project.screenshots.slice(0, 4).map((screenshot, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden"
                      >
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">✨ Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm sm:text-base break-words">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture & Development Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🏗️ Architecture</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10">
                    {project.architecture}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🚀 Development Highlights</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {project.developmentHighlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <h4 className="font-semibold text-cyan-400 text-sm sm:text-base mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Technologies */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🛠️ Technologies</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-xs sm:text-sm border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-300 break-words"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📊 Performance</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                      <span>Load Time</span>
                      <span>{project.performance?.loadTime || 0}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.performance?.loadTime || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                      <span>Accessibility</span>
                      <span>{project.performance?.accessibility || 0}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.performance?.accessibility || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                      <span>Best Practices</span>
                      <span>{project.performance?.bestPractices || 0}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.performance?.bestPractices || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                      <span>SEO</span>
                      <span>{project.performance?.seo || 0}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-yellow-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.performance?.seo || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🎯 Challenges & Solutions</h3>
                <div className="space-y-2 sm:space-y-3">
                  {project.challenges.slice(0, 3).map((challenge, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10"
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-red-400 mt-0.5 text-sm">⚡</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-gray-300 text-xs sm:text-sm mb-1 break-words">
                            {challenge}
                          </p>
                          <p className="text-cyan-400 text-xs break-words">
                            {project.solutions[index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🔗 Links</h3>
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-center transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                    >
                      📁 GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-center transition-all duration-300 border border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Learned & Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📚 Lessons Learned</h3>
              <div className="space-y-2">
                {project.lessonsLearned.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="text-yellow-400 mt-0.5 text-sm">💡</span>
                    <p className="text-gray-300 text-xs sm:text-sm break-words">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🔮 Future Improvements</h3>
              <div className="space-y-2">
                {project.futureImprovements.map((improvement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="text-green-400 mt-0.5 text-sm">🚀</span>
                    <p className="text-gray-300 text-xs sm:text-sm break-words">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;