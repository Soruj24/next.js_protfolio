"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";
import ResumeHeader from "@/components/features/resume/ResumeHeader";
import ResumeSection from "@/components/features/resume/ResumeSection";
import ResumeSkills from "@/components/features/resume/ResumeSkills";
import ResumeProjects from "@/components/features/resume/ResumeProjects";
import ResumeEducation from "@/components/features/resume/ResumeEducation";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const { personalInfo, summary, skills, projects, education } = resumeData;

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("/api/resume/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: window.location.href }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "soruj-mahmud-resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to generate PDF. Try using browser Print (Ctrl+P) instead.",
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="resume-outer bg-white text-[#333333] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[10pt] leading-relaxed max-w-[210mm] mx-auto px-[16mm] py-[18mm]">
      <style>{`
        @media print {
          .resume-outer {
            max-width: none !important;
            background: white !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div className="no-print text-center mb-5">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="px-6 py-2.5 text-sm font-semibold bg-[#2b4c7e] text-white border-none rounded-md cursor-pointer hover:bg-[#1f3a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? "Generating PDF..." : "Download as PDF"}
        </button>
      </div>

      <ResumeHeader info={personalInfo} />

      <ResumeSection title="Professional Summary">
        <p className="m-0 text-justify">{summary}</p>
      </ResumeSection>

      <ResumeSection title="Technical Skills">
        <ResumeSkills skills={skills} />
      </ResumeSection>

      <ResumeSection title="Key Projects">
        <ResumeProjects projects={projects} />
      </ResumeSection>

      <ResumeSection title="Education">
        <ResumeEducation education={education} />
      </ResumeSection>
    </div>
  );
}
