"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";
import Link from "next/link";

interface ContactInfoPanelProps {
  email: string;
}

export default function ContactInfoPanel({ email }: ContactInfoPanelProps) {
  const { settings } = usePortfolioSettings();
  const personalInfo = settings?.personal_info;
  const profile = settings?.profile;

  const infoItems = [
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo?.location || "Tangail, Dhaka, Bangladesh",
      accent: "text-purple-400",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: profile?.response_time || "Within 24 hours",
      accent: "text-cyan-400",
    },
    {
      icon: Globe,
      label: "Availability",
      value: profile?.availability === "available" ? "Open to opportunities" : profile?.availability || "Open to opportunities",
      accent: "text-emerald-400",
    },
  ];

  const socials = (settings?.social_links || [])
    .filter((s) => s.visible)
    .map((s) => ({
      label: s.platform,
      href: s.platform.toLowerCase() === "email" ? `mailto:${email || s.url}` : s.url,
    }));

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
        <p className="text-gray-400 text-sm leading-relaxed">
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
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm text-gray-300 font-medium">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Social Links */}
      {socials?.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Connect
          </p>
          <div className="flex gap-2">
            {socials?.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-400 text-xs font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 hover:text-white"
                aria-label={social.label}
              >
                {social?.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
