import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import TechChip from "../ui/TechChip";
import { skillCategories } from "../../data/skills";

function SkillsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[][]>([]);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        categoriesRef.current,
        {
          opacity: 0,
          y: 100,
          rotationY: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      skillsRef.current.forEach((skillArray, categoryIndex) => {
        skillArray?.forEach((skill, skillIndex) => {
          if (skill) {
            gsap.fromTo(
              skill,
              { width: "0%" },
              {
                width: `${skillCategories[categoryIndex].skills[skillIndex].level}%`,
                duration: 2,
                delay: categoryIndex * 0.5 + skillIndex * 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: skill,
                  start: "top 85%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });

      categoriesRef.current.forEach((category) => {
        if (category) {
          category.addEventListener("mouseenter", () => {
            gsap.to(category, {
              y: -10,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          category.addEventListener("mouseleave", () => {
            gsap.to(category, {
              y: 0,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });

      gsap.to(".skill-category", {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (
    el: HTMLDivElement | null,
    categoryIndex: number,
    skillIndex: number
  ) => {
    if (!skillsRef.current[categoryIndex]) {
      skillsRef.current[categoryIndex] = [];
    }
    if (el && !skillsRef.current[categoryIndex][skillIndex]) {
      skillsRef.current[categoryIndex][skillIndex] = el;
    }
  };

  const addCategoryRef = (el: HTMLDivElement | null, index: number) => {
    categoriesRef.current[index] = el;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Technical Expertise"
          subtitle="Mastering the tools and technologies that power modern AI applications"
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={(el) => addCategoryRef(el, categoryIndex)}
              className="skill-category group"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 h-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-semibold text-white group-hover/skill:text-cyan-400 transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-bold text-lg">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <div
                          ref={(el) => addToRefs(el, categoryIndex, skillIndex)}
                          className={`h-3 rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden group-hover/skill:shadow-lg group-hover/skill:shadow-cyan-500/25 transition-all duration-300`}
                          style={{ width: "0%" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/skill:opacity-100 group-hover/skill:animate-pulse transition-opacity duration-300" />
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        {'description' in skill ? skill.description : ''}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "LangChain",
              "MCP Server",
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "OpenAI",
              "Tailwind CSS",
              "GSAP",
              "Python",
              "FastAPI",
              "Docker",
              "AWS",
              "Git",
              "WebSocket",
              "Redis",
              "Pinecone",
              "Vector Databases",
              "AI Agents",
              "Custom Tools",
            ].map((tech, index) => (
              <TechChip key={tech} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsShowcase;
