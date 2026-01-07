import { useRef, useEffect, useState } from "react";
import Image from "next/image";
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
      className="min-h-screen py-32 flex items-center relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="The Story"
          subtitle="Merging Human Creativity with Artificial Intelligence"
        />

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div ref={textRef} className="space-y-8 order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              AI Software Architect
            </div>
            
            <div className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              <span className="text-white">I build </span>
              <span className="text-gradient">Intelligent Systems</span>
              <span className="text-white"> that bridge the gap between imagination and reality.</span>
            </div>

            <div className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
              <p>
                Hello! I&apos;m <span className="text-white font-medium underline decoration-cyan-500/30 decoration-2 underline-offset-4">Soruj Mahmud</span>, 
                a developer obsessed with the frontier of AI technology. I specialize in the 
                <span className="text-cyan-400"> LangChain ecosystem</span> and 
                <span className="text-purple-400"> MCP Server architecture</span>.
              </p>

              <p>
                My approach is simple: build tools that aren&apos;t just functional, but 
                <span className="text-white italic"> transformative</span>. Whether it&apos;s custom AI agents or 
                sophisticated data pipelines, I focus on creating seamless, high-performance solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={(el) => addCardRef(el, index)}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
              {/* Outer glowing rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse-slow" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 glass-morphism p-2">
                <div className="relative w-full h-full rounded-full bg-gray-800 overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-out">
                  <Image
                    src="/soruj.jpg"
                    alt="Soruj Mahmud"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl glass-card flex items-center justify-center animate-float shadow-lg border border-white/20">
                <span className="text-xl">🤖</span>
              </div>
              <div className="absolute bottom-4 -left-8 w-14 h-14 rounded-2xl glass-card flex items-center justify-center animate-float delay-700 shadow-lg border border-white/20">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl glass-card flex items-center justify-center animate-float delay-1000 shadow-lg border border-white/20">
                <span className="text-lg">🧠</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
