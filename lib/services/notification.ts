import { connectDB } from "@/config/db";
import { Activity, type ActivityType } from "@/models/Activity";

interface CreateNotificationParams {
  title: string;
  description?: string;
  type: ActivityType;
  link?: string;
  metadata?: Record<string, unknown>;
}

export async function createNotification(data: CreateNotificationParams) {
  try {
    await connectDB();
    const activity = await Activity.create({
      title: data.title,
      description: data.description || "",
      type: data.type,
      link: data.link || "",
      read: false,
      metadata: data.metadata || {},
    });
    return activity;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
}

export async function markNotificationRead(id: string) {
  try {
    await connectDB();
    await Activity.findByIdAndUpdate(id, { read: true });
  } catch (error) {
    console.error("Failed to mark notification read:", error);
  }
}

export async function markAllNotificationsRead() {
  try {
    await connectDB();
    await Activity.updateMany({ read: false }, { read: true });
  } catch (error) {
    console.error("Failed to mark all notifications read:", error);
  }
}

export async function getUnreadCount() {
  try {
    await connectDB();
    return await Activity.countDocuments({ read: false });
  } catch {
    return 0;
  }
}

// ─── Typed Notification Creators ────────────────────────────────

export const notify = {
  async projectPublished(title: string, projectId: string) {
    return createNotification({
      title: "Project published",
      description: `"${title}" is now live on your portfolio.`,
      type: "project",
      link: `/admin/projects`,
      metadata: { projectId, action: "published" },
    });
  },

  async projectUpdated(title: string, projectId: string) {
    return createNotification({
      title: "Project updated",
      description: `"${title}" was modified.`,
      type: "project",
      link: `/admin/projects`,
      metadata: { projectId, action: "updated" },
    });
  },

  async projectDeleted(title: string) {
    return createNotification({
      title: "Project deleted",
      description: `"${title}" was permanently removed.`,
      type: "project",
      link: `/admin/projects`,
      metadata: { action: "deleted" },
    });
  },

  async blogPublished(title: string, slug: string) {
    return createNotification({
      title: "Blog published",
      description: `"${title}" is now live.`,
      type: "blog",
      link: `/blog/${slug}`,
      metadata: { slug, action: "published" },
    });
  },

  async blogUpdated(title: string, slug: string) {
    return createNotification({
      title: "Blog updated",
      description: `"${title}" was modified.`,
      type: "blog",
      link: `/blog/${slug}`,
      metadata: { slug, action: "updated" },
    });
  },

  async messageReceived(name: string, subject: string, contactId: string) {
    return createNotification({
      title: "Message received",
      description: `${name} sent "${subject}" via the contact form.`,
      type: "contact",
      link: `/admin/inquiries`,
      metadata: { contactId, name, subject },
    });
  },

  async securityEvent(description: string) {
    return createNotification({
      title: "Security event",
      description,
      type: "security",
      link: `/admin/settings`,
      metadata: { action: "security" },
    });
  },

  async deploymentFinished(status: "success" | "failure", environment: string) {
    return createNotification({
      title: status === "success" ? "Deployment completed" : "Deployment failed",
      description: `${environment} deployment ${status === "success" ? "finished successfully" : "encountered errors"}.`,
      type: "deployment",
      metadata: { status, environment },
    });
  },

  async analyticsMilestone(metric: string, value: number) {
    return createNotification({
      title: "Analytics milestone",
      description: `Your portfolio reached ${value.toLocaleString()} ${metric}.`,
      type: "analytics",
      link: `/admin/analytics`,
      metadata: { metric, value },
    });
  },

  async githubCommit(message: string, repo: string) {
    return createNotification({
      title: "New commit",
      description: `"${message}" pushed to ${repo}.`,
      type: "github",
      metadata: { repo, message },
    });
  },

  async systemEvent(title: string, description: string) {
    return createNotification({
      title,
      description,
      type: "system",
      metadata: { action: "system" },
    });
  },
};
