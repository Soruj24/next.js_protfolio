import type { ResumeSkillCategory } from "@/types/resume";

interface ResumeSkillsProps {
  skills: ResumeSkillCategory[];
}

export default function ResumeSkills({ skills }: ResumeSkillsProps) {
  return (
    <div className="w-full mt-1">
      {skills.map((skill) => (
        <div key={skill.label} className="flex">
          <div className="w-[22%] font-bold text-[#444444] py-1">
            {skill.label}:
          </div>
          <div className="w-[78%] py-1">{skill.items}</div>
        </div>
      ))}
    </div>
  );
}
