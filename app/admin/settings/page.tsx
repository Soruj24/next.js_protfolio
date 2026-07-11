import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import EnterpriseSettingsPage from "@/features/admin/components/settings/EnterpriseSettingsPage";
import personalData from "@/data/Personal.json";

export const dynamic = 'force-dynamic';

async function getSettings() {
  const conn = await connectDB();
  if (!conn) {
    return personalData;
  }
  try {
    const settings = await Settings.findOne().lean();
    if (!settings) {
      return personalData;
    }
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return personalData;
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="py-2">
      <EnterpriseSettingsPage initialData={settings} />
    </div>
  );
}
