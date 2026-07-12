"use client";

import { User, AtSign, Briefcase, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GlobeIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export default function ProfileBasicInfo({
  fullName, email, title, location, phone, website,
  onChange,
}: {
  fullName: string;
  email: string;
  title: string;
  location: string;
  phone: string;
  website: string;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-5">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          Personal Information
        </CardTitle>
        <CardDescription>Your basic profile details</CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={<><User size={13} className="text-gray-500" /> Full Name</>} value={fullName} onChange={(v) => onChange("full_name", v)} placeholder="Your full name" />
        <Field label={<><AtSign size={13} className="text-gray-500" /> Email</>} value={email} onChange={(v) => onChange("email", v)} placeholder="you@example.com" type="email" />
        <Field label={<><Briefcase size={13} className="text-gray-500" /> Professional Title</>} value={title} onChange={(v) => onChange("professional_title", v)} placeholder="e.g. Senior Frontend Developer" />
        <Field label={<><MapPin size={13} className="text-gray-500" /> Location</>} value={location} onChange={(v) => onChange("location", v)} placeholder="City, Country" />
        <Field label={<><AtSign size={13} className="text-gray-500" /> Phone</>} value={phone} onChange={(v) => onChange("phone", v)} placeholder="+1 (555) 000-0000" />
        <Field label={<><GlobeIcon size={13} className="text-gray-500" /> Website</>} value={website} onChange={(v) => onChange("website", v)} placeholder="https://yoursite.com" />
      </CardContent>
    </Card>
  );
}

function Field({
  label, value, onChange, placeholder, type,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-300 text-sm flex items-center gap-1.5">{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20" />
    </div>
  );
}
