import { useRef } from "react";

interface ContactInfoProps {
  contact: {
    icon: string;
    label: string;
    value: string;
    link: string;
  };
  index: number;
}

function ContactInfo({ contact }: ContactInfoProps) {
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={infoRef}
      className="contact-element contact-info-card flex items-center space-x-6 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 group cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
      onClick={() => window.open(contact.link, "_blank")}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
        {contact.icon}
      </div>
      <div className="flex-1">
        <div className="text-gray-400 text-sm mb-1">{contact.label}</div>
        <div className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
          {contact.value}
        </div>
      </div>

      <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        →
      </div>
    </div>
  );
}

export default ContactInfo;
