"use client";
import { useState } from "react";
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <article
      className="service-card group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)] hover:border-white/20 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          {Icon && <Icon className="w-7 h-7 text-white" />}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-sm text-gray-300"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} shrink-0`}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}
        />
      </div>
    </article>
  );
}
