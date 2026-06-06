import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { IProject } from "@/types";
import ModalHeader from "./project-modal/ModalHeader";
import ModalScreenshots from "./project-modal/ModalScreenshots";
import ModalFeatures from "./project-modal/ModalFeatures";
import ModalArchitectureHighlights from "./project-modal/ModalArchitectureHighlights";
import ModalTechnologies from "./project-modal/ModalTechnologies";
import ModalPerformance from "./project-modal/ModalPerformance";
import ModalChallenges from "./project-modal/ModalChallenges";
import ModalLinks from "./project-modal/ModalLinks";
import ModalLessons from "./project-modal/ModalLessons";

interface ProjectModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen || !project) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

      const isMobile = window.innerWidth < 768;
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: isMobile ? 0.95 : 0.8, y: isMobile ? 50 : 100 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [isOpen, project]);

  const handleClose = () => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.to(modalRef.current, { opacity: 0, scale: isMobile ? 0.95 : 0.8, y: isMobile ? 50 : 100, duration: 0.3, ease: "power2.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => closeRef.current() });
    });
    return () => ctx.revert();
  };

  if (!isOpen || !project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-lg"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div ref={modalRef} className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-gray-900 rounded-xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <ModalHeader project={project} onClose={handleClose} />

        <div ref={contentRef} className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <ModalScreenshots screenshots={project.screenshots} title={project.title} />
              <ModalFeatures features={project.features} />
              <ModalArchitectureHighlights project={project} />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <ModalTechnologies technologies={project.technologies} />
              <ModalPerformance performance={project.performance!} />
              <ModalChallenges challenges={project.challenges} solutions={project.solutions} />
              <ModalLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </div>
          </div>

          <ModalLessons lessonsLearned={project.lessonsLearned} futureImprovements={project.futureImprovements} />
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
