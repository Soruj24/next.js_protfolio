"use client";

import Link from "next/link";

export default function Resume() {
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
        {/* Print Button */}
        <div className="no-print text-center mb-5">
          <button
            onClick={() => window.print()}
            className=" px-6 py-2.5 text-sm font-semibold bg-[#2b4c7e] text-white border-none rounded-md cursor-pointer hover:bg-[#1f3a5e] transition-colors"
          >
            Download as PDF
          </button>
        </div>

        {/* Header */}
        <div className="border-b-2 border-[#2b4c7e] pb-3 mb-[18px]">
          <h1 className="text-[22pt] font-bold text-[#2b4c7e] m-0 mb-1 tracking-[-0.5px]">
            Soruj Mahmud
          </h1>
          <div className="text-[12pt] font-medium text-[#555555] uppercase tracking-[1px] m-0 mb-2.5">
            Front-End Developer
          </div>
          <div className="w-full text-[9pt] text-[#666666]">
            <div className="flex flex-wrap gap-[15px]">
              <div>sorujahmudb2h@email.com</div>
              <div>01795397598</div>
              <div> Dhaka, Bangladesh</div>
            </div>
            <div className="flex flex-wrap gap-[15px]">
              <div>
                <Link
                  href="https://www.linkedin.com/in/soruj-mahmud-ab9388298/"
                  className="text-[#2b4c7e] no-underline"
                >
                  linkedin.com/in/soruj-mahmud
                </Link>
              </div>
              <div>
                <Link
                  href="https://github.com/Soruj24"
                  className="text-[#2b4c7e] no-underline"
                >
                  github.com/Soruj24
                </Link>
              </div>
              <div>
                <Link
                  href="https://next-js-protfolio-zeta.vercel.app/"
                  className="text-[#2b4c7e] no-underline"
                >
                  sorujahmud.dev
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-4 break-inside-avoid">
          <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
            Professional Summary
          </div>
          <p className="m-0 text-justify">
            Enthusiastic and detail-oriented Front-End Developer with a strong
            foundation in modern JavaScript frameworks, responsive web design,
            and UI/UX principles. Passionate about crafting clean, efficient,
            and accessible code to build highly interactive user interfaces.
            Proven ability to translate complex design wireframes into
            functional web applications through academic projects and
            independent software building. Quick learner who stays updated on
            evolving web standards and thrives in collaborative team
            environments.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-4 break-inside-avoid">
          <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
            Technical Skills
          </div>
          <div className="w-full mt-1">
            <div className="flex">
              <div className="w-[22%] font-bold text-[#444444] py-1">
                Languages:
              </div>
              <div className="w-[78%] py-1">
                JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
              </div>
            </div>
            <div className="flex">
              <div className="w-[22%] font-bold text-[#444444] py-1">
                Frameworks & Libs:
              </div>
              <div className="w-[78%] py-1">
                React.js, Next.js, Node.js, Express, Redux Toolkit
              </div>
            </div>
            <div className="flex">
              <div className="w-[22%] font-bold text-[#444444] py-1">
                UI & Styling:
              </div>
              <div className="w-[78%] py-1">
                Tailwind CSS, Material UI, CSS Modules, Responsive Web Design
              </div>
            </div>
            <div className="flex">
              <div className="w-[22%] font-bold text-[#444444] py-1">
                Tools & Workflows:
              </div>
              <div className="w-[78%] py-1">
                Git, GitHub, REST APIs, Webpack, Vite, npm/yarn, Postman
              </div>
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div className="mb-4 break-inside-avoid">
          <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
            Key Projects
          </div>

          {/* Project 1 */}
          <div className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-1">
              <div className="font-bold text-[10.5pt] text-[#222222]">
                AI-Powered Search & Discovery Interface Redesign
              </div>
              <div className="text-right text-[9.5pt] text-[#666666] italic">
                Independent Project
              </div>
            </div>
            <ul className="m-0 pl-[18px]">
              <li className="mb-0.75 text-justify">
                Architected and implemented a high-performance web interface
                inspired by modern conversational AI platforms using Next.js and
                TypeScript.
              </li>
              <li className="mb-0.75 text-justify">
                Leveraged Tailwind CSS to craft a fully responsive, semantic
                layout that improved mobile user navigation fluidity.
              </li>
              <li className="mb-0.75 text-justify">
                Integrated modular state-management patterns to handle dynamic
                search results and complex user preference states flawlessly.
              </li>
              <li className="mb-0.75 text-justify">
                Optimized rendering cycles and asset delivery, resulting in a
                25% improvement in initial page-load performance metrics.
              </li>
            </ul>
            <div className="text-[9pt] text-[#555555] mt-1 italic">
              <strong>Technologies Used:</strong> Next.js, React, TypeScript,
              Tailwind CSS, Git
            </div>
          </div>

          {/* Project 2 */}
          <div className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-1">
              <div className="font-bold text-[10.5pt] text-[#222222]">
                Interactive E-Commerce Dashboard
              </div>
              <div className="text-right text-[9.5pt] text-[#666666] italic">
                Academic Capstone
              </div>
            </div>
            <ul className="m-0 pl-[18px]">
              <li className="mb-0.75 text-justify">
                Developed a responsive admin dashboard featuring multi-axis
                analytical charts, complex data filtering, and product inventory
                tracking tables.
              </li>
              <li className="mb-0.75 text-justify">
                Consumed RESTful endpoints asynchronously using Axios and
                handled complex state transformations using Redux Toolkit.
              </li>
              <li className="mb-0.75 text-justify">
                Ensured strict compliance with cross-browser compatibility and
                accessibility guidelines (WCAG 2.1 AA).
              </li>
            </ul>
            <div className="text-[9pt] text-[#555555] mt-1 italic">
              <strong>Technologies Used:</strong> React.js, Redux Toolkit,
              Chart.js, CSS Modules, REST API
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-4 break-inside-avoid">
          <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
            Education
          </div>
          <div className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-1">
              <div className="font-bold text-[10.5pt] text-[#222222]">
                Bachelor of Science in Computer Science
              </div>
              <div className="text-right text-[9.5pt] text-[#666666] italic">
                Graduated: May 2025
              </div>
            </div>
            <div className="italic text-[#555555] mb-1.25 text-[9.5pt]">
              State University, College of Engineering — GPA: 3.7/4.0
            </div>
            <ul className="m-0 pl-[18px]">
              <li className="mb-0.75 text-justify">
                Relevant Coursework: Data Structures & Algorithms, Web
                Application Development, Software Engineering, Database
                Management Systems, Human-Computer Interaction.
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="mb-4 break-inside-avoid">
          <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
            Certifications & Achievements
          </div>
          <ul className="m-0 pl-[18px]">
            <li className="mb-0.75 text-justify">
              <strong>Meta Front-End Developer Professional Certificate</strong>{" "}
              — Coursera (Verified)
            </li>
            <li className="mb-0.75 text-justify">
              <strong>Advanced React and State Management</strong> — Frontend
              Masters
            </li>
            <li className="mb-0.75 text-justify">
              Secured 2nd place out of 50+ participating teams in the Annual
              University Hackathon by rapidly prototyping an accessible
              community resource portal within 36 hours.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
