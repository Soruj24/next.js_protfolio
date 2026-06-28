"use client";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowLeft } from "react-icons/fa";
import { useProjectDetails } from "@/features/projects/hooks/useProjectDetails";
import Loading from "@/features/projects/components/Loading";
import HeaderSection from "@/features/projects/components/HeaderSection";
import Overview from "@/features/projects/components/Overview";
import Features from "@/features/projects/components/Features";
import ScreenshotsGallery from "@/features/projects/components/ScreenshotsGallery";
import Technologies from "@/features/projects/components/Technologies";
import ProjectStats from "@/features/projects/components/ProjectStats";
import PerformanceMetrics from "@/features/projects/components/PerformanceMetrics";
import MainImage from "@/features/projects/components/MainImage";
import BackgroundEffects from "@/features/projects/components/BackgroundEffects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const { project, loading } = useProjectDetails(id);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || loading) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      const sections = contentRef.current?.querySelectorAll(".project-section");
      if (sections) {
        sections.forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [project, loading]);

  if (loading) {
    return <Loading />;
  }

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#030014] text-white pt-24 pb-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Header Section */}
        <header ref={headerRef} className="mb-16">
          <HeaderSection project={project} />
        </header>

        {/* Main Image */}
        <MainImage project={project} />

        {/* Content Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Left Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <Overview project={project} />

            {/* Features */}
            <Features project={project} />

            {/* Screenshots Gallery */}
            <ScreenshotsGallery project={project} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <Technologies project={project} />

            {/* Project Stats */}
            <ProjectStats project={project} />

            {/* Performance Metrics */}
            <PerformanceMetrics project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
