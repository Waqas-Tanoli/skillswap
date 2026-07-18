export type NotificationType =
  | "swap_request"
  | "swap_accepted"
  | "swap_rejected"
  | "swap_completed"
  | "message"
  | "rating";

export interface NotificationSender {
  _id: string;
  username: string;
  avatar?: string;
}

export interface Notification {
  _id: string;

  recipient: string;

  sender?: NotificationSender;

  type: NotificationType;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface NotificationResponse {
  success: boolean;

  count: number;

  data: Notification[];
}

export interface UnreadCountResponse {
  success: boolean;

  count: number;
}