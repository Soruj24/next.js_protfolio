import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import SettingsForm from "@/components/admin/SettingsForm";
import personalData from "@/data/Parsonal.json";

export const dynamic = 'force-dynamic';

async function getSettings() {
  const conn = await connectDB();
  
  if (!conn) {
    return personalData;
  }

  try {
    const settings = await Settings.findOne().lean();
    
    if (!settings) {
      // If no settings in DB, use the JSON data as initial values
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
    <div className="container mx-auto py-10">
      <SettingsForm initialData={settings} />
    </div>
  );
}
