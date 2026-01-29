import React, { forwardRef } from "react";
import { gsap } from "gsap";
import { ISkillCategory } from "@/models/Skill";

interface SkillCategoryCardProps {
  category: ISkillCategory;
  categoryIndex: number;
  addToRefs: (
    el: HTMLDivElement | null,
    categoryIndex: number,
    skillIndex: number
  ) => void;
}

const SkillCategoryCard = forwardRef<HTMLDivElement, SkillCategoryCardProps>(
  ({ category, categoryIndex, addToRefs }, ref) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      if (!card) return;

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="skill-category group relative"
      >
        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-700 h-full relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          {/* Background Accent */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700" />

          <div className="flex items-center mb-10 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-2xl mr-5 border border-white/10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-inner">
              <span className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {category.icon}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {category.title}
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent mt-1 rounded-full" />
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            {category.skills.map((skill, skillIndex) => (
              <div key={`${skill.name}-${skillIndex}`} className="group/skill">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl group-hover/skill:scale-125 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold text-sm">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/5">
                  <div
                    ref={(el) => addToRefs(el, categoryIndex, skillIndex)}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                    style={{ width: "0%" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1500 ease-in-out" />
                  </div>
                </div>
                {"description" in skill && skill.description && (
                  <p className="text-gray-500 text-xs mt-2 font-medium opacity-0 group-hover/skill:opacity-100 transform translate-y-2 group-hover/skill:translate-y-0 transition-all duration-300">
                    {skill.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SkillCategoryCard.displayName = "SkillCategoryCard";

export default SkillCategoryCard;

