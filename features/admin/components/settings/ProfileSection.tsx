"use client";

import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileProfessionalDetails from "./ProfileProfessionalDetails";

interface ProfileSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function ProfileSection({ settings, updateSettings }: ProfileSectionProps) {
  const { profile, personal_info } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ProfileAvatarUpload
        initialAvatar={profile.avatar}
        onAvatarChange={(v) => updateSettings("profile", "avatar", v)}
      />

      <ProfileBasicInfo
        fullName={personal_info.full_name}
        email={personal_info.email}
        title={personal_info.professional_title}
        location={personal_info.location}
        phone={personal_info.phone}
        website={personal_info.website || ""}
        onChange={(key, value) => updateSettings("personal_info", key, value)}
      />

      <ProfileProfessionalDetails
        tagline={profile.tagline}
        bio={profile.bio}
        availability={profile.availability}
        hourlyRate={profile.hourly_rate}
        responseTime={profile.response_time}
        onChange={updateSettings}
      />
    </div>
  );
}
