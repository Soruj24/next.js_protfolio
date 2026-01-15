"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { Download, Loader2, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import personalData from "@/data/Parsonal.json";
import { experiences as localExperiences } from "@/data/experience";
import { projects as localProjects } from "@/data/projects";
import { contactInfo } from "@/data/contact";
import { skillCategories } from "@/data/skills";

// Types for better type safety
interface Experience {
  role: string;
  company: string;
  year: string;
  description: string;
  technologies?: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  id?: string;
}

interface SkillCategory {
  title: string;
  skills: { name: string }[];
}

interface ResumeData {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  professionalSummary: string;
  education: string;
  additionalEducation: string;
  skillCategories: SkillCategory[];
  suggestedProjects: Project[];
  experience: Experience[];
}

// Updated Constants for styling to match screenshot
const STYLES = {
  RESUME: {
    width: "850px",
    backgroundColor: "#ffffff",
    padding: "40px 50px",
    color: "#1e293b",
    fontFamily:
      '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 1.4,
    display: "block" as const,
  },
  HEADER: {
    title: {
      fontSize: "48px",
      fontWeight: 800,
      color: "#0f172a",
      margin: "0 0 5px 0",
      letterSpacing: "-0.03em",
      textTransform: "uppercase" as const,
      lineHeight: 1,
    },
    subtitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#1e40af",
      margin: "0 0 5px 0",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
    contact: {
      fontSize: "11px",
      color: "#475569",
      fontWeight: 500,
    },
  },
  SECTION: {
    title: {
      fontSize: "14px",
      fontWeight: 800,
      color: "#ffffff",
      backgroundColor: "#0f172a",
      padding: "5px 15px",
      textTransform: "uppercase" as const,
      marginBottom: "15px",
      letterSpacing: "0.1em",
    },
  },
} as const;

export default function DynamicResume() {
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Centralized data mapping with useMemo for performance
  const resumeData: ResumeData = useMemo(() => {
    // Ensure we have fallback data if imports fail or are empty
    const settings = personalData || {};
    const allProjects = localProjects || [];
    const allExperiences = localExperiences || [];
    const allSkillCategories = skillCategories || [];

    const personalInfo = settings.personal_info || {};
    const technicalSkills = settings.technical_skills || {
      core_technologies: [],
      specializations: [],
    };
    const education = settings.education || {};
    const expFocus = settings.experience?.focus || "";

    // Safely get contact info
    const getContactValue = (label: string) => {
      const contact = contactInfo?.find((c) => c.label === label);
      return contact?.value || "";
    };

    // If skillCategories from skills.ts is empty, construct it from Parsonal.json
    let finalSkillCategories: SkillCategory[] = [];

    if (allSkillCategories && allSkillCategories.length > 0) {
      finalSkillCategories = allSkillCategories.map((cat) => ({
        title: cat.title,
        skills: cat.skills.map((skill) => ({ name: skill.name })),
      }));
    } else if (technicalSkills.core_technologies?.length > 0) {
      finalSkillCategories = [
        {
          title: "AI & LangChain",
          skills: (
            technicalSkills.specializations || [
              "LangChain Framework",
              "MCP Server Development",
              "Custom Tool Integration",
              "Vector Databases & Embeddings",
            ]
          ).map((s: string) => ({ name: s })),
        },
        {
          title: "Frontend Development",
          skills: (
            technicalSkills.core_technologies || [
              "Next.js + React",
              "TypeScript",
              "Tailwind CSS",
            ]
          ).map((s: string) => ({ name: s })),
        },
        {
          title: "Backend & Database",
          skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"].map(
            (s) => ({ name: s })
          ),
        },
      ];
    }

    // Prepare featured projects - ensure we have projects matching the screenshot
    let featuredProjects: Project[] = allProjects
      .filter((p: any) => p.featured)
      .map((p: any) => ({
        title: p.title,
        description: p.description,
        technologies: p.technologies,
        featured: p.featured,
        id: p.id
      }))
      .slice(0, 4);

    // If no featured projects or not enough, use default projects from screenshot
    if (featuredProjects.length < 4) {
      const defaultProjects: Project[] = [
        {
          title: "AI-Powered Chatbot Platform",
          description:
            "Intelligent chatbot platform with natural language processing, multi-channel support, and analytics.",
          technologies: ["AI", "TypeScript", "Python", "TensorFlow"],
          featured: true,
          id: "ai-chatbot",
        },
        {
          title: "Modern E-Commerce Platform",
          description:
            "Full-featured e-commerce solution with admin dashboard, payment integration, and inventory management.",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
          featured: true,
          id: "ecommerce",
        },
        {
          title: "AI Fitness Tracker & Coach",
          description:
            "Intelligent fitness tracking application with AI-powered workout plans, progress analytics, and virtual coaching.",
          technologies: ["React Native", "TypeScript", "Node.js", "Express"],
          featured: true,
          id: "fitness-tracker",
        },
        {
          title: "Task Orchestrator with Agentic AI",
          description:
            "Autonomous task decomposition and execution platform using multi-agent systems and real-time monitoring.",
          technologies: ["LangChain", "Python", "React", "MCP Server"],
          featured: true,
          id: "task-orchestrator",
        },
      ];
      featuredProjects = [...featuredProjects, ...defaultProjects].slice(0, 4);
    }

    const finalExperience: Experience[] = allExperiences.map((exp: any) => ({
      role: exp.role,
      company: exp.company,
      year: exp.year,
      description: exp.description,
      technologies: exp.technologies
    }));

    return {
      fullName: personalInfo.full_name || "SORUJ MAHMUD",
      professionalTitle:
        personalInfo.professional_title || "ASPIRING FULL-STACK DEVELOPER",
      email: personalInfo.email || "soujmahmudb2h@gmail.com",
      phone: personalInfo.phone || "+8807755397598",
      location: personalInfo.location || "Tengali, Dhaka, Bangladesh",
      github: getContactValue("GitHub") || "Soruj24",
      linkedin: getContactValue("LinkedIn") || "/in/soruj-mahmud",
      portfolio: getContactValue("Portfolio") || "soruj-mahmud.dev",
      professionalSummary:
        "Full-stack development with AI integration through project work.",
      education: "HSC Science",
      additionalEducation:
        "Self-taught developer with comprehensive project-based learning in modern web technologies and AI applications",
      skillCategories: finalSkillCategories,
      suggestedProjects: featuredProjects,
      experience:
        finalExperience.length > 0
          ? finalExperience
          : [
              {
                role: "AI & LangChain Specialist",
                company: "Self-Directed Learning & Projects",
                year: "2023-PRESENT",
                description:
                  "Focused on mastering LangChain framework, MCP server development, and building AI-powered applications through hands-on projects",
                technologies: [
                  "LangChain",
                  "MCP Server",
                  "OpenAI",
                  "Vector Databases",
                  "Custom Tools",
                ],
              },
              {
                role: "Full Stack Development",
                company: "Personal Projects & Open Source",
                year: "2022-2023",
                description:
                  "Built multiple full-stack applications, mastering modern web technologies and backend development",
                technologies: [
                  "Next.js",
                  "React",
                  "Node.js",
                  "MongoDB",
                  "TypeScript",
                ],
              },
              {
                role: "Frontend Development",
                company: "Learning & Skill Building",
                year: "2021-2022",
                description:
                  "Focused on frontend technologies, UI/UX principles, and responsive design",
                technologies: [
                  "React",
                  "JavaScript",
                  "CSS",
                  "HTML",
                  "Tailwind",
                ],
              },
            ],
    };
  }, [contactInfo, skillCategories, localProjects, localExperiences]);

  // PDF generation with error handling and cleanup
  const generatePDF = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) return;

    setIsGenerating(true);
    let canvas: HTMLCanvasElement | null = null;

    try {
      // Ensure fonts are loaded before capturing
      await document.fonts.ready;

      // Wait a bit for any pending renders
      await new Promise((resolve) => setTimeout(resolve, 300));

      canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 850,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-pdf-template");
          if (clonedElement) {
            clonedElement.style.visibility = "visible";
            clonedElement.style.display = "block";
            clonedElement.style.position = "relative";
            clonedElement.style.left = "0";
          }

          const style = clonedDoc.createElement("style");
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            * { 
              font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important; 
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
              box-sizing: border-box !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image with better quality settings
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${resumeData.fullName.replace(/\s+/g, "_")}_CV_${timestamp}.pdf`;

      pdf.save(filename);

      toast.success("Professional CV generated and downloaded!", {
        description: `File saved as ${filename}`,
      });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate resume", {
        description: "Please try again or check console for details.",
      });
    } finally {
      // Cleanup
      if (canvas) {
        canvas.remove();
      }
      setIsGenerating(false);
    }
  }, [resumeData.fullName]);

  // GSAP animations with cleanup
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!btnRef.current) return;

      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btnRef.current, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;

    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  // SVG Icons for consistent rendering
  const SvgIcons = {
    Email: () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    Phone: () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    Location: () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    LinkedIn: () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    GitHub: () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    Briefcase: () => (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#475569"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  };

  return (
    <>
      {/* Download Button */}
      <button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={generatePDF}
        disabled={isGenerating}
        className="group relative px-6 py-3 bg-white/5 backdrop-blur-xl text-white rounded-xl font-medium transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden border border-white/10 hover:border-cyan-500/50 hover:bg-white/10"
        aria-label="Download Resume as PDF"
        title="Download Professional CV"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Loading state */}
        {isGenerating ? (
          <div className="relative z-10 flex items-center gap-2">
            <Loader2 size={18} className="animate-spin text-cyan-400" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Generating...
            </span>
          </div>
        ) : (
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all duration-500">
              <Download
                size={16}
                className="text-cyan-400 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors duration-300">
                Professional
              </span>
              <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-cyan-100 group-hover:to-white transition-all duration-300">
                CURRICULUM VITAE
              </span>
            </div>
          </div>
        )}
      </button>

      {/* Hidden Resume Template for PDF Generation - Updated to match screenshot */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: "0",
          overflow: "hidden",
          pointerEvents: "none",
          width: "850px",
          visibility: "visible" as const,
        }}
      >
        <div ref={resumeRef} id="resume-pdf-template" style={STYLES.RESUME}>
          {/* Header Section - Updated to match screenshot */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "25px",
              borderBottom: "2px solid #0f172a",
              paddingBottom: "20px",
            }}
          >
            <h1 style={STYLES.HEADER.title}>{resumeData.fullName}</h1>
            <p style={STYLES.HEADER.subtitle}>{resumeData.professionalTitle}</p>

            {/* Contact Info - Single line as in screenshot */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
                color: "#475569",
                fontSize: "11px",
                fontWeight: 500,
                marginTop: "5px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <SvgIcons.Email />
                <span>{resumeData.email}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <SvgIcons.Phone />
                <span>{resumeData.phone}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <SvgIcons.Location />
                <span>{resumeData.location}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <SvgIcons.GitHub />
                <span>github.com/{resumeData.github}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary - Compact style */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={STYLES.SECTION.title}>PROFESSIONAL SUMMARY</h3>
            <p
              style={{
                fontSize: "12px",
                color: "#334155",
                lineHeight: "1.5",
                textAlign: "left",
                margin: "0",
                padding: "0 5px",
              }}
            >
              {resumeData.professionalSummary}
            </p>
          </div>

          {/* Technical Expertise - Multi-column layout */}
          {resumeData.skillCategories &&
            resumeData.skillCategories.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={STYLES.SECTION.title}>TECHNICAL EXPERIENCE</h3>
                <div
                  style={{
                    padding: "0 5px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                  }}
                >
                  {resumeData.skillCategories.map((category, idx) => (
                    <div key={`skill-cat-${idx}`} style={{ marginBottom: "0" }}>
                      <h4
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#1e40af",
                          margin: "0 0 6px 0",
                          textTransform: "uppercase",
                        }}
                      >
                        {category.title}
                      </h4>
                      <ul
                        style={{
                          fontSize: "11px",
                          color: "#1e293b",
                          fontWeight: 500,
                          margin: "0",
                          padding: "0",
                          listStyle: "none",
                        }}
                      >
                        {category.skills.map((skill, skillIdx) => (
                          <li
                            key={`skill-${idx}-${skillIdx}`}
                            style={{
                              marginBottom: "2px",
                              lineHeight: "1.4",
                            }}
                          >
                            • {skill.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Professional Experience */}
          {resumeData.experience.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={STYLES.SECTION.title}>PROFESSIONAL EXPERIENCE</h3>
              <div style={{ padding: "0 5px" }}>
                {resumeData.experience.map((exp, idx) => (
                  <div
                    key={`exp-${idx}`}
                    style={{
                      marginBottom: "15px",
                      paddingBottom: "15px",
                      borderBottom:
                        idx === resumeData.experience.length - 1
                          ? "none"
                          : "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "5px",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#0f172a",
                            margin: "0 0 3px 0",
                          }}
                        >
                          {exp.role}
                        </h4>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#475569",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <SvgIcons.Briefcase />
                          {exp.company}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#1e40af",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {exp.year}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        lineHeight: "1.5",
                        textAlign: "justify",
                        margin: "8px 0 10px 0",
                      }}
                    >
                      {exp.description}
                    </p>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={`tech-${idx}-${tIdx}`}
                            style={{
                              fontSize: "9px",
                              backgroundColor: "#f8fafc",
                              color: "#475569",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              border: "1px solid #e2e8f0",
                              fontWeight: 600,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects - Updated layout */}
          {resumeData.suggestedProjects.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={STYLES.SECTION.title}>KEY PROJECTS & CONTRIBUTIONS</h3>
              <div style={{ padding: "0 5px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                  }}
                >
                  {resumeData.suggestedProjects.map((project, idx) => (
                    <div
                      key={`project-${idx}`}
                      style={{
                        borderLeft: "2px solid #3b82f6",
                        paddingLeft: "15px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#0f172a",
                          margin: "0 0 6px 0",
                          lineHeight: "1.3",
                        }}
                      >
                        {project.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "10.5px",
                          color: "#475569",
                          lineHeight: "1.4",
                          margin: "0 0 8px 0",
                          textAlign: "justify",
                        }}
                      >
                        {project.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={`project-tech-${idx}-${tIdx}`}
                            style={{
                              fontSize: "8.5px",
                              color: "#3b82f6",
                              fontWeight: 700,
                              backgroundColor: "#eff6ff",
                              padding: "1px 6px",
                              borderRadius: "3px",
                            }}
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Education - Updated to match screenshot */}
          {resumeData.education && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={STYLES.SECTION.title}>EDUCATION</h3>
              <div style={{ padding: "0 5px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 5px 0",
                  }}
                >
                  {resumeData.education}
                </p>
                {resumeData.additionalEducation && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#475569",
                      lineHeight: "1.5",
                      margin: "0",
                      textAlign: "justify",
                    }}
                  >
                    {resumeData.additionalEducation}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer - Updated to match screenshot */}
          <div
            style={{
              marginTop: "30px",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "15px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "9px",
                color: "#94a3b8",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              REFERENCES AVAILABLE UPON REQUEST •{" "}
              {new Date()
                .toLocaleDateString("en-US", { month: "long", year: "numeric" })
                .toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
