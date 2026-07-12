import { connectDB } from "@/config/db";
import {
  getVisitorsOverTime,
  getMessagesOverTime,
  getContactSources,
  getProjectCategories,
  getTechUsage,
  getDeviceBreakdown,
  getBrowserBreakdown,
  getCountryBreakdown,
  getHourlyActivity,
} from "@/lib/services/charts-queries";
import {
  fillVisitorsOverTime,
  fillMessagesOverTime,
  fillHourlyActivity,
  computePercentages,
  processGitHubData,
} from "@/lib/services/charts-utils";
import type { ChartsData } from "@/lib/services/charts-types";

export async function getChartsData(): Promise<ChartsData> {
  await connectDB();

  const [
    visitorsRaw,
    messagesRaw,
    contactSourcesRaw,
    projectCategories,
    techUsage,
    deviceBreakdownRaw,
    browserBreakdownRaw,
    countryBreakdownRaw,
    hourlyActivityRaw,
  ] = await Promise.all([
    getVisitorsOverTime(),
    getMessagesOverTime(),
    getContactSources(),
    getProjectCategories(),
    getTechUsage(),
    getDeviceBreakdown(),
    getBrowserBreakdown(),
    getCountryBreakdown(),
    getHourlyActivity(),
  ]);

  const visitorsOverTime = fillVisitorsOverTime(visitorsRaw);
  const messagesOverTime = fillMessagesOverTime(messagesRaw);
  const hourlyActivity = fillHourlyActivity(hourlyActivityRaw);

  const deviceBreakdown = computePercentages(deviceBreakdownRaw);
  const browserBreakdown = computePercentages(browserBreakdownRaw);
  const countryBreakdown = computePercentages(countryBreakdownRaw);
  const contactSources = computePercentages(contactSourcesRaw);

  const gitHubData = await processGitHubData();

  return {
    visitorsOverTime,
    messagesOverTime,
    ...gitHubData,
    projectCategories,
    techUsage,
    contactSources,
    deviceBreakdown,
    browserBreakdown,
    countryBreakdown,
    hourlyActivity,
  };
}
