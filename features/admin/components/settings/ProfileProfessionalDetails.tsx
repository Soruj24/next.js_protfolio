"use client";

import { Briefcase, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ProfileProfessionalDetails({
  tagline, bio, availability, hourlyRate, responseTime,
  onChange,
}: {
  tagline: string;
  bio: string;
  availability: string;
  hourlyRate: string;
  responseTime: string;
  onChange: (section: "profile" | "personal_info", key: string, value: unknown) => void;
}) {
  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-5">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Briefcase size={16} className="text-white" />
          </div>
          Professional Details
        </CardTitle>
        <CardDescription>Your bio and work availability</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Tagline</Label>
          <Input value={tagline} onChange={(e) => onChange("profile", "tagline", e.target.value)} placeholder="e.g. Building the web, one pixel at a time" className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Bio</Label>
          <Textarea value={bio} onChange={(e) => onChange("profile", "bio", e.target.value)} placeholder="Tell us about yourself..." rows={3} className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Availability</Label>
            <Select value={availability} onValueChange={(v) => onChange("profile", "availability", v)}>
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1"><DollarSign size={13} /> Hourly Rate</Label>
            <Input value={hourlyRate} onChange={(e) => onChange("profile", "hourly_rate", e.target.value)} placeholder="e.g. 50" className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20" />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1"><Clock size={13} /> Response Time</Label>
            <Select value={responseTime} onValueChange={(v) => onChange("profile", "response_time", v)}>
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Within 1 hour">Within 1 hour</SelectItem>
                <SelectItem value="Within 4 hours">Within 4 hours</SelectItem>
                <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
