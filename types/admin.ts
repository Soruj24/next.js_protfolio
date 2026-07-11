export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  reply?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InboxResponse {
  data: Inquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}
