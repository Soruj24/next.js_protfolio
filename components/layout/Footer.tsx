import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".footer-float", {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="footer-float text-gray-400 text-lg">
            © {currentYear} Soruj Mahmud. Built with ❤️ using Next.js & GSAP
          </div>

          <div className="flex space-x-8">
            {[
              { label: "Privacy", link: "#" },
              { label: "Terms", link: "#" },
              { label: "Contact", link: "#contact" },
            ].map((item) => (
              <button
                key={item.label}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 footer-float"
                onClick={() => {
                  if (item.link.startsWith("#")) {
                    document
                      .getElementById(item.link.slice(1))
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.open(item.link, "_blank");
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="footer-float px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ Back to Top
          </button>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <div className="text-cyan-400 text-sm">
            Specializing in LangChain and MCP Server Development • 60+ Projects
            Completed
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;