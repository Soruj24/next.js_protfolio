import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

export default function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <div className="mb-4 break-inside-avoid">
      <div className="text-[12pt] font-bold text-[#2b4c7e] uppercase tracking-[0.5px] border-l-4 border-[#2b4c7e] pl-2 m-0 mb-2.5">
        {title}
      </div>
      {children}
    </div>
  );
}
