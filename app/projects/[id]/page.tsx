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
            (p: IProject) => p.id === id || p._id === id
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
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                  {project.status}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 group"
                  title="View Source Code"
                >
                  <FaGithub className="text-2xl group-hover:text-cyan-400" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
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
            <section className="project-section">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FaLightbulb className="text-cyan-400" />
                <span>Overview</span>
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>
            </section>

            {/* Features */}
            <section className="project-section">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaRocket className="text-purple-400" />
                <span>Key Features</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section className="project-section">
                <h2 className="text-3xl font-bold mb-8">Visual Showcase</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors group"
                    >
                      <Image
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <section className="project-section p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaCode className="text-cyan-400" />
                <span>Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm border border-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Project Stats */}
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

            {/* Performance Metrics */}
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
                        <span className="text-cyan-400 font-bold">
                          {value}%
                        </span>
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
        </div>
      </div>
    </div>
  );
}
