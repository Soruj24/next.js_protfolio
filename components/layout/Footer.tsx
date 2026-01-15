import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import personalData from "../../data/Parsonal.json";
import FooterCopyright from "./footer/FooterCopyright";
import FooterSocials from "./footer/FooterSocials";
import FooterLinks from "./footer/FooterLinks";
import FooterScrollToTop from "./footer/FooterScrollToTop";
import FooterSpecialization from "./footer/FooterSpecialization";

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const personalInfo = personalData.personal_info || {};
  const fullName = personalInfo.full_name || "Soruj Mahmud";
  const email = personalInfo.email || "sorujmahmudb2h@gmail.com";
  const specializations = personalData.technical_skills?.specializations || [];
  const specializationText =
    specializations.slice(0, 2).join(" and ") || "AI and Web Development";

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
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <FooterCopyright year={currentYear} fullName={fullName} />
            <FooterSocials email={email} />
          </div>

          <FooterLinks />

          <FooterScrollToTop />
        </div>

        <FooterSpecialization text={specializationText} />
      </div>
    </footer>
  );
}

export default Footer;
