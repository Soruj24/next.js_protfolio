import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import { experiences } from "../../data/experience";

function LearningJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".timeline-dot",
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotationY: index % 2 === 0 ? -90 : 90,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      itemsRef.current.forEach((item) => {
        if (item) {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, {
              y: -10,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(item, {
              y: 0,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const addItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };

  return (
    <section
      id="journey"
      className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-purple-900/30 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Learning Journey"
          subtitle="My path through mastering AI technologies and software development"
        />

        <div ref={timelineRef} className="relative mt-20">
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform origin-top shadow-2xl shadow-cyan-500/25"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.year}
                ref={(el) => addItemRef(el, index)}
                className={`timeline-item relative flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                <div className="timeline-dot absolute left-8 md:left-1/2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-gray-900 transform -translate-x-1.5 -translate-y-1/2 z-10 shadow-2xl shadow-cyan-500/50"></div>

                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden">
                    <div className="flex items-start mb-6">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${exp.color} rounded-2xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-cyan-400 font-bold text-lg mb-1">
                          {exp.year}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="text-gray-400 text-lg">
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningJourney;
