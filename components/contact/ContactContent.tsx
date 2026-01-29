import React from "react";
import ContactInfo from "../ui/ContactInfo";

interface ContactContentProps {
  focus: string;
  contactInfo: any[];
  email: string;
  personalInfo: any;
}

const ContactContent: React.FC<ContactContentProps> = ({ focus, contactInfo, email, personalInfo }) => {
  return (
    <div className="space-y-8 md:space-y-10">
      <div className="contact-element group text-center lg:text-left">
        <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white/50 mb-4 md:mb-6">
          Connect with the Future
        </h3>
        <p className="text-base md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
          {focus} Let&apos;s architect something extraordinary.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6 max-w-md mx-auto lg:mx-0">
        {contactInfo.map((contact, index) => (
          <div key={contact.label} className="contact-element">
            <ContactInfo
              contact={
                contact.label === "Email"
                  ? { ...contact, value: email, link: `mailto:${email}` }
                  : contact
              }
              index={index}
            />
          </div>
        ))}
      </div>

      <div className="contact-element flex justify-center lg:justify-start space-x-4 md:space-x-5 pt-4">
        {[
          { icon: "💼", label: "LinkedIn", link: personalInfo?.linkedin || "#" },
          { icon: "🐙", label: "GitHub", link: personalInfo?.github || "#" },
          { icon: "🔗", label: "Portfolio", link: "#" },
          {
            icon: "📧",
            label: "Email",
            link: `mailto:${email}`,
          },
        ].map((social) => (
          <button
            key={social.label}
            className="w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-500 group relative overflow-hidden"
            onClick={() => window.open(social.link, "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              {social.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactContent;
