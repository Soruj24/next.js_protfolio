"use client";

import { resumeData } from "@/data/resume";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeSkills from "@/components/resume/ResumeSkills";
import ResumeProjects from "@/components/resume/ResumeProjects";
import ResumeEducation from "@/components/resume/ResumeEducation";

export default function Resume() {
  const { personalInfo, summary, skills, projects, education } = resumeData;

  return (
    <div className="bg-white text-[#333333] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[10pt] leading-relaxed max-w-[210mm] mx-auto">
      <style>{`
        @page {
          size: A4;
          margin: 18mm 16mm;
        }
        @media print {
          .resume-page {
            padding: 0;
            max-width: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="resume-page px-[16mm] py-[18mm]">
        <div className="no-print text-center mb-5">
          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 text-sm font-semibold bg-[#2b4c7e] text-white border-none rounded-md cursor-pointer hover:bg-[#1f3a5e] transition-colors"
          >
            Download as PDF
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
    </div>
  );
}
