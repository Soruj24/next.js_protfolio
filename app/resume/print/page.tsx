"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { ResumeData } from "@/lib/resume/resume-types";
import "./resume-print.css";

export default function ResumePrintPage() {
  const [data, setData] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
        Loading resume data…
      </div>
    );
  }

  return (
    <div>
      <div className="resume-toolbar" role="toolbar" aria-label="Resume actions">
        <div className="resume-toolbar-inner">
          <Link
            href="/resume"
            className="resume-toolbar-btn resume-toolbar-btn-outline"
            aria-label="Go back to resume"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Back to Resume</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="resume-toolbar-btn resume-toolbar-btn-primary"
            aria-label="Print or save resume as PDF"
          >
            <Printer size={15} strokeWidth={2} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      <div className="resume-print">
        {/* Header */}
        <header className="resume-print-header">
          <h1 className="resume-print-name">{data.name}</h1>
          <p className="resume-print-headline">{data.headline}</p>
          {data.subline && (
            <p className="resume-print-subline">{data.subline}</p>
          )}
          <div className="resume-print-contact">
            {data.location && <span>{data.location}</span>}
            {data.email && (
              <a href={`mailto:${data.email}`}>{data.email}</a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone.replace(/[\s\-()]/g, "")}`}>{data.phone}</a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {data.portfolio && (
              <a href={data.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        <section>
          <h2 className="resume-print-section-title">Professional Summary</h2>
          {data.summary.map((paragraph, i) => (
            <p key={i} className="resume-print-paragraph">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Technical Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="resume-print-section-title">Technical Skills</h2>
            {data.skills.map((skill) => (
              <div key={skill.label} className="resume-print-skill-row">
                <span className="resume-print-skill-label">{skill.label}</span>
                <span className="resume-print-skill-items">{skill.items}</span>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="resume-print-section-title">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.title} className="resume-print-project">
                <div className="resume-print-project-header">
                  <h3 className="resume-print-project-title">{project.title}</h3>
                  <div className="resume-print-project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-print-project-link"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-print-project-link"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.documentationUrl && (
                      <a
                        href={project.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-print-project-link"
                      >
                        Documentation
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-print-project-link"
                      >
                        Case Study
                      </a>
                    )}
                    {project.demoVideoUrl && (
                      <a
                        href={project.demoVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-print-project-link"
                      >
                        Demo Video
                      </a>
                    )}
                  </div>
                </div>
                <p className="resume-print-project-desc">{project.desc}</p>
                {project.tags.length > 0 && (
                  <p className="resume-print-project-tags">
                    {project.tags.join(" · ")}
                  </p>
                )}
                {project.stack && (
                  <p className="resume-print-project-stack">{project.stack}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="resume-print-section-title">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.title} className="resume-print-edu-item">
                <span className="resume-print-edu-title">{edu.title}</span>
                {" — "}
                <span className="resume-print-edu-institute">
                  {edu.institute}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Core Competencies */}
        {data.competencies.length > 0 && (
          <section>
            <h2 className="resume-print-section-title">Core Competencies</h2>
            <div className="resume-print-pills">
              {data.competencies.map((c) => (
                <span key={c} className="resume-print-pill">
                  {c}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <h2 className="resume-print-section-title">Languages</h2>
            <div className="resume-print-pills">
              {data.languages.map((lang) => (
                <span key={lang} className="resume-print-pill">
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
