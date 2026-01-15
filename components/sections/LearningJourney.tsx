import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import { experiences } from "../../data/experience";
import JourneyBackground from "../journey/JourneyBackground";
import JourneyCard from "../journey/JourneyCard";

function LearningJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      <JourneyBackground />

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
                  <JourneyCard
                    ref={(el) => addItemRef(el, index)}
                    exp={exp}
                    index={index}
                  />
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
