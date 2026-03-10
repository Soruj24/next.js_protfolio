import { IProject } from "@/types";
import Image from "next/image";
import React from "react";

const MainImage = ({ project }: { project: IProject }) => {
  return (
    <div className="project-section relative aspect-video rounded-3xl overflow-hidden border border-white/10 mb-20 group">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div>
    </div>
  );
};

export default MainImage;
