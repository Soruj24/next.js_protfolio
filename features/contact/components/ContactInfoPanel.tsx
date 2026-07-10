"use client";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ArrowUpRight,
  MessageCircle,
  Globe,
} from "lucide-react";

interface ContactInfoPanelProps {
  email: string;
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Soruj24",
    icon: Github,
    color: "hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/soruj-mahmud",
    icon: Linkedin,
    color: "hover:text-blue-400",
  },
  {
    label: "Email",
    href: "mailto:sorujmahmudb2h@gmail.com",
    icon: Mail,
    color: "hover:text-cyan-400",
  },
];

const infoItems = [
  {
    icon: MapPin,
    label: "Location",
    value: "Tangail, Dhaka, Bangladesh",
    accent: "text-purple-400",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    accent: "text-cyan-400",
  },
  {
    icon: Globe,
    label: "Availability",
    value: "Open to opportunities",
    accent: "text-emerald-400",
  },
];

export default function ContactInfoPanel({ email }: ContactInfoPanelProps) {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Extraordinary
          </span>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Have a project in mind or want to discuss opportunities? I&apos;m
          always interested in hearing about new projects and creative ideas.
        </p>
      </div>

      {/* Info Cards */}
      <div className="space-y-3">
        {infoItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-white/[0.1] transition-colors">
                <Icon className={`w-4 h-4 ${item.accent}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm text-gray-300 font-medium">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Calendar Booking Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.04] border border-cyan-500/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Schedule a Call</p>
            <p className="text-[11px] text-gray-600">30-min consultation</p>
          </div>
        </div>
        <button
          disabled
          className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-gray-600 cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Calendar className="w-3.5 h-3.5" />
          Coming Soon
        </button>
      </motion.div>

      {/* Social Links */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          Connect
        </p>
        <div className="flex gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-500 text-xs font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 ${social.color}`}
                aria-label={social.label}
              >
                <Icon className="w-4 h-4" />
                {social.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Projects", value: "3+" },
          { label: "Experience", value: "2+ yr" },
          { label: "Response", value: "<24h" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
          >
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
