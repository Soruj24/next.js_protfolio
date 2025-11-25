import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [emojiPositions, setEmojiPositions] = useState<
    Array<{ left: number; top: number }>
  >([]);

  // Generate random positions once when component mounts
  useEffect(() => {
    const positions = Array(8)
      .fill(null)
      .map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }));
  // Avoid calling setState synchronously inside useEffect
  // Instead, compute the initial state directly in useState
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".word",
        {
          opacity: 0,
          y: 50,
          rotationX: -45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 90,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "elastic.out(1, 0.8)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      gsap.to(".floating-emoji", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word inline-block mr-2">
        {word}
      </span>
    ));
  };

  const stats = [
    {
      value: "LangChain",
      label: "Specialist",
      color: "from-cyan-500 to-blue-500",
    },
    {
      value: "MCP Server",
      label: "Expert",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "AI Tools",
      label: "Developer",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const emojis = ["⚡", "🚀", "🔗", "🎯", "🔥", "🌟", "💡", "⚙️"];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="About Me"
          subtitle="Passionate AI Developer specializing in LangChain and MCP Server technologies"
        />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="space-y-8">
            <div className="text-2xl text-gray-300 leading-relaxed">
              {splitWords(
                "Hello! I'm Soruj Mahmud, a passionate developer specializing in AI-powered applications with expertise in LangChain and MCP Server development."
              )}
            </div>

            <div className="text-lg text-gray-400 leading-relaxed">
              {splitWords(
                "I specialize in building sophisticated AI applications using LangChain framework, creating custom MCP servers, and developing intelligent tools that enhance AI capabilities."
              )}
            </div>

            <div className="text-lg text-gray-400 leading-relaxed">
              {splitWords(
                "While I may not have traditional corporate experience, I've built numerous complex projects that demonstrate my capabilities in modern AI technologies and full-stack development."
              )}
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={(el) => addCardRef(el, index)}
                  className="flex-1 min-w-32 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105"
                >
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl border border-cyan-500/30 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>

                <div className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                  🤖
                </div>

                <div className="absolute inset-0">
                  {emojiPositions.map((position, i) => (
                    <div
                      key={i}
                      className="floating-emoji absolute text-2xl opacity-60"
                      style={{
                        left: `${position.left}%`,
                        top: `${position.top}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      {emojis[i]}
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>

              <div className="absolute inset-0">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full border border-purple-500/50 backdrop-blur-sm flex items-center justify-center text-xl"
                    style={{
                      animation: `orbit ${8 + i * 2}s linear infinite`,
                      animationDelay: `${i * 2}s`,
                      top: "50%",
                      left: "50%",
                      marginTop: "-2rem",
                      marginLeft: "-2rem",
                    }}
                  >
                    {["🤖", "🔗", "⚙️"][i]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
