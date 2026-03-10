import { IProject } from "@/types";
import Image from "next/image";
import React from "react";

const ScreenshotsGallery = ({ project }: { project: IProject }) => {
  return (
    <div>
      {" "}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="project-section">
          <h2 className="text-3xl font-bold mb-8">Visual Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <Image
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ScreenshotsGallery;
