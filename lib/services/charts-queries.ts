import { AnalyticsEvent } from "@/models/AnalyticsEvent";
import { Contact } from "@/models/Contact";
import { Project } from "@/models/Project";

function thirtyDaysAgo() {
  return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
}

function ninetyDaysAgo() {
  return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
}

export function getVisitorsOverTime() {
  return AnalyticsEvent.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo() } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        visitors: {
          $addToSet: {
            $cond: [{ $ne: ["$userAgent", null] }, "$userAgent", "$$REMOVE"],
          },
        },
        pageViews: { $sum: { $cond: [{ $eq: ["$event", "page_view"] }, 1, 0] } },
        projectViews: { $sum: { $cond: [{ $eq: ["$event", "project_view"] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        visitors: { $size: "$visitors" },
        pageViews: 1,
        projectViews: 1,
      },
    },
    { $sort: { date: 1 } },
  ]);
}

export function getMessagesOverTime() {
  return Contact.aggregate([
    { $match: { createdAt: { $gte: ninetyDaysAgo() } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, date: "$_id", count: 1 } },
    { $sort: { date: 1 } },
  ]);
}

export function getContactSources() {
  return AnalyticsEvent.aggregate([
    { $match: { $and: [{ referrer: { $ne: null } }, { referrer: { $ne: "" } }] } },
    {
      $addFields: {
        cleanDomain: {
          $let: {
            vars: { parts: { $split: ["$referrer", "/"] } },
            in: {
              $replaceAll: {
                input: { $arrayElemAt: ["$$parts", 2] },
                find: "www.",
                replacement: "",
              },
            },
          },
        },
      },
    },
    { $group: { _id: "$cleanDomain", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, source: "$_id", count: 1 } },
  ]);
}

export function getProjectCategories() {
  return Project.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);
}

export function getTechUsage() {
  return Project.aggregate([
    { $unwind: "$technologies" },
    { $group: { _id: { $toLower: "$technologies" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 15 },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);
}

export function getDeviceBreakdown() {
  return AnalyticsEvent.aggregate([
    { $match: { $and: [{ device: { $ne: null } }, { device: { $ne: "" } }] } },
    { $group: { _id: "$device", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);
}

export function getBrowserBreakdown() {
  return AnalyticsEvent.aggregate([
    { $match: { $and: [{ browser: { $ne: null } }, { browser: { $ne: "" } }] } },
    { $group: { _id: "$browser", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);
}

export function getCountryBreakdown() {
  return AnalyticsEvent.aggregate([
    { $match: { $and: [{ country: { $ne: null } }, { country: { $ne: "" } }] } },
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);
}

export function getHourlyActivity() {
  return AnalyticsEvent.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo() } } },
    { $group: { _id: { $hour: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, hour: "$_id", count: 1 } },
  ]);
}
