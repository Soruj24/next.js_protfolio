"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { Download, Loader2, Sparkles } from "lucide-react";
import { ISettings } from "@/models/Settings";

export default function DynamicResume() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // 1. Fetch data from API
      const [settingsRes, projectsRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/projects"),
      ]);

      const settings = await settingsRes.json();
      const allProjects = await projectsRes.json();

      const personalInfo = settings.personal_info || {};
      const technicalSkills = settings.technical_skills || {
        core_technologies: [],
      };
      const education = settings.education || {};
      const expFocus = settings.experience?.focus || "";
      const experiences = settings.experiences || [];
      const featuredProjects = allProjects
        .filter((p: { featured: boolean }) => p.featured)
        .slice(0, 4);

      const data = {
        professionalSummary:
          expFocus + ". " + (education.additional_info || ""),
        optimizedSkills: technicalSkills.core_technologies || [],
        suggestedProjects: featuredProjects,
        experience: experiences,
      };

      // 2. Create a temporary hidden div for the resume layout
      const resumeElement = document.createElement("div");
      resumeElement.id = "resume-template";
      resumeElement.style.position = "fixed";
      resumeElement.style.left = "-9999px";
      resumeElement.style.top = "0";
      resumeElement.style.width = "800px";
      resumeElement.style.padding = "30px"; // Reduced from 50px
      resumeElement.style.backgroundColor = "white";
      resumeElement.style.color = "#1a1a1a";
      resumeElement.style.fontFamily = "'Inter', sans-serif";

      resumeElement.innerHTML = `
        <div style="padding: 40px; color: #1e293b; line-height: 1.5; font-family: 'Inter', -apple-system, sans-serif; background: white; width: 800px;">
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px;">
            <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -1px;">${(personalInfo.full_name || "RESUME").toUpperCase()}</h1>
            <p style="font-size: 14px; font-weight: 600; color: #4f46e5; margin: 5px 0 15px 0; text-transform: uppercase; letter-spacing: 2px;">${personalInfo.professional_title || ""}</p>
            
            <div style="display: flex; justify-content: center; gap: 20px; font-size: 11px; color: #64748b;">
              <span style="display: flex; align-items: center; gap: 5px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                ${personalInfo.email || ""}
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${personalInfo.phone || ""}
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${personalInfo.location || ""}
              </span>
            </div>
          </div>

          <!-- Summary -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; border-left: 4px solid #4f46e5; padding-left: 10px; margin-bottom: 10px;">Professional Summary</h3>
            <p style="font-size: 12px; color: #334155; text-align: justify; margin: 0;">${data.professionalSummary}</p>
          </div>

          <!-- Skills Section -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; border-left: 4px solid #4f46e5; padding-left: 10px; margin-bottom: 12px;">Technical Expertise</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${data.optimizedSkills
                .map(
                  (skill: string) => `
                <span style="background: #f8fafc; color: #1e293b; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 600; border: 1px solid #e2e8f0;">${skill}</span>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Experience Section -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; border-left: 4px solid #4f46e5; padding-left: 10px; margin-bottom: 15px;">Work Experience</h3>
            ${data.experience
              .map(
                (exp: {
                  role: string;
                  year: string;
                  company: string;
                  description: string;
                }) => `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                  <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0;">${exp.role}</h4>
                  <span style="font-size: 11px; font-weight: 600; color: #64748b;">${exp.year}</span>
                </div>
                <div style="font-size: 11px; font-weight: 600; color: #4f46e5; margin-bottom: 5px;">${exp.company}</div>
                <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.4;">${exp.description}</p>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Projects Section -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; border-left: 4px solid #4f46e5; padding-left: 10px; margin-bottom: 15px;">Key Projects</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              ${data.suggestedProjects
                .map(
                  (project: {
                    title: string;
                    technologies: string[];
                    description: string;
                  }) => `
                <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <h4 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0 0 5px 0;">${project.title}</h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
                    ${project.technologies
                      .slice(0, 3)
                      .map(
                        (tech) => `
                      <span style="font-size: 8px; font-weight: 700; color: #4f46e5; background: #eef2ff; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${tech}</span>
                    `
                      )
                      .join("")}
                  </div>
                  <p style="font-size: 10px; color: #475569; margin: 0; line-height: 1.4;">${project.description}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center;">
            <p style="font-size: 9px; color: #94a3b8; margin: 0;">
              Portfolio: sorujmahmud.com • Updated ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(resumeElement);

      // 3. Convert to PDF
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${personalInfo.full_name || "Resume"}_CV_${new Date().getTime()}.pdf`
      );

      // 4. Cleanup
      document.body.removeChild(resumeElement);
      toast.success("Professional CV generated and downloaded!");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
    >
      {isGenerating ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Generating CV...</span>
        </>
      ) : (
        <>
          <Sparkles
            size={18}
            className="group-hover:animate-pulse text-cyan-200"
          />
          <span>Download Unique CV</span>
          <Download
            size={18}
            className="ml-1 group-hover:translate-y-0.5 transition-transform"
          />
        </>
      )}
    </button>
  );
}
