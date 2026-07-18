import  api  from "../../services/api";

import type {
  Notification,
  NotificationResponse,
  UnreadCountResponse,
} from "./types";

// Get all notifications
export const getNotifications = async (): Promise<
  Notification[]
> => {
  const response =
    await api.get<NotificationResponse>(
      "/notifications"
    );

  return response.data.data;
};

// Get unread count
export const getUnreadCount = async (): Promise<number> => {
  const response =
    await api.get<UnreadCountResponse>(
      "/notifications/unread-count"
    );

  return response.data.count;
};

// Mark one notification as read
export const markNotificationAsRead = async (
  id: string
) => {
  return api.patch(
    `/notifications/${id}/read`
  );
};

// Mark all notifications as read
export const markAllNotificationsAsRead =
  async () => {
    return api.patch(
      "/notifications/read-all"
    );
  };

// Delete notification
export const deleteNotification = async (
  id: string
) => {
  return api.delete(
    `/notifications/${id}`
  );
};