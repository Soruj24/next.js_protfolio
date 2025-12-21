import AuditLog from "@/models/AuditLog";
import dbConnect from "@/lib/db/mongoose";

interface AuditOptions {
  action: string;
  userId: string;
  userEmail: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditLogger {
  static async log(options: AuditOptions) {
    try {
      await dbConnect();

      await AuditLog.create({
        action: options.action,
        userId: options.userId,
        userEmail: options.userEmail,
        entityType: options.entityType,
        entityId: options.entityId,
        changes: options.changes || {},
        ipAddress: options.ipAddress,
        userAgent: options.userAgent,
      });
    } catch (error) {
      console.error("Failed to log audit:", error);
      // Don't throw - auditing shouldn't break the main functionality
    }
  }

  static async getUserLogs(
    userId: string,
    limit: number = 50,
    page: number = 1
  ) {
    await dbConnect();

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AuditLog.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      AuditLog.countDocuments({ userId }),
    ]);

    return {
      logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getEntityLogs(
    entityType: string,
    entityId: string,
    limit: number = 50
  ) {
    await dbConnect();

    return AuditLog.find({ entityType, entityId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}
