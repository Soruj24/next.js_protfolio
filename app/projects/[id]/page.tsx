"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects as localProjects } from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaRocket,
  FaCode,
  FaLightbulb,
} from "react-icons/fa";
import { IProject } from "@/types";
import Loading from "@/services/projectDetails/Loading";
import HeaderSection from "@/services/projectDetails/HeaderSection";
import Overview from "@/services/projectDetails/Overview";
import Features from "@/services/projectDetails/Features";
import ScreenshotsGallery from "@/services/projectDetails/ScreenshotsGallery";
import Technologies from "@/services/projectDetails/Technologies";
import ProjectStats from "@/services/projectDetails/ProjectStats";
import PerformanceMetrics from "@/services/projectDetails/PerformanceMetrics";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // First try to find in local data
        const localProject = localProjects.find((p) => p.id === id);
        if (localProject) {
          setProject(localProject);
          setLoading(false);
          return;
        }

        // If not in local, try to fetch from API
        const res = await fetch("/api/projects");
        if (res.ok) {
          const allProjects = await res.json();
          const foundProject = allProjects.find(
            (p: IProject) => p.id === id || p._id === id,
          );
          if (foundProject) {
            setProject(foundProject);
          } else {
            router.push("/#projects");
          }
        } else {
          router.push("/#projects");
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        router.push("/#projects");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  useEffect(() => {
    if (!project || loading) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Content Sections Animation
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
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>

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
        <div className="project-section relative aspect-video rounded-3xl overflow-hidden border border-white/10 mb-20 group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div>
        </div>

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
