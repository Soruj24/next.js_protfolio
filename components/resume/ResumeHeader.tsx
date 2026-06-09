"use client";

import Link from "next/link";
import type { ResumePersonalInfo } from "@/types/resume";

interface ResumeHeaderProps {
  info: ResumePersonalInfo;
}

export default function ResumeHeader({ info }: ResumeHeaderProps) {
  return (
    <div className="border-b-2 border-[#2b4c7e] pb-3 mb-[18px]">
      <h1 className="text-[22pt] font-bold text-[#2b4c7e] m-0 mb-1 tracking-[-0.5px]">
        {info.name}
      </h1>
      <div className="text-[12pt] font-medium text-[#555555] uppercase tracking-[1px] m-0 mb-2.5">
        {info.title}
      </div>
      <div className="w-full text-[9pt] text-[#666666]">
        <div className="flex flex-wrap gap-[15px]">
          <div>{info.email}</div>
          <div>{info.phone}</div>
          <div>{info.location}</div>
        </div>
        <div className="flex flex-wrap gap-[15px]">
          {info.links.map((link) => (
            <div key={link.label}>
              <Link
                href={link.url}
                className="text-[#2b4c7e] no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
