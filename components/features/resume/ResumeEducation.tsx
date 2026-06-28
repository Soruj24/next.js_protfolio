import type { ResumeEducation } from "@/types/resume";

interface ResumeEducationProps {
  education: ResumeEducation[];
}

export default function ResumeEducation({ education }: ResumeEducationProps) {
  return (
    <>
      {education.map((edu) => (
        <div key={edu.degree} className="mb-3 break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <div className="font-bold text-[10.5pt] text-[#222222]">
              {edu.degree}
            </div>
            {edu.date && (
              <div className="text-right text-[9.5pt] text-[#666666] italic">
                {edu.date}
              </div>
            )}
          </div>
          <div className="italic text-[#555555] mb-1.25 text-[9.5pt]">
            {edu.school}
          </div>
          <ul className="m-0 pl-[18px]">
            <li className="mb-0.75 text-justify">{edu.coursework}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
