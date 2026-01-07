import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import { experiences } from "../../data/experience";

function LearningJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = itemsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = itemsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".timeline-dot",
        { scale: 0, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
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
              y: 50,
              rotationY: index % 2 === 0 ? -45 : 45,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotationY: 0,
              duration: 1.5,
              delay: index * 0.3,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Pulse animation for dots
      gsap.to(".timeline-dot", {
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
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

        <div ref={timelineRef} className="relative mt-24">
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform origin-top shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={exp.year}
                className={`timeline-item relative flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                <div className="timeline-dot absolute left-[31px] md:left-1/2 w-4 h-4 bg-white rounded-full border-[3px] border-cyan-500 transform -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>

                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div
                    ref={(el) => addItemRef(el, index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-700 group hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />
                    
                    <div className="flex items-start mb-6 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-3xl mr-5 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-xl`}
                      >
                        <span className="drop-shadow-lg">{exp.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-cyan-400 font-mono font-bold text-sm tracking-wider">
                            {exp.year}
                          </span>
                          <span className="h-px w-8 bg-cyan-500/30"></span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="text-gray-400 font-medium">
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed text-base font-medium relative z-10">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 bg-white/5 rounded-xl text-xs font-semibold text-cyan-300 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
