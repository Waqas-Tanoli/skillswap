import Notification from "../models/notification";

interface CreateNotificationParams {
  recipient: string;
  sender?: string;

  type:
    | "swap_request"
    | "swap_accepted"
    | "swap_rejected"
    | "swap_completed"
    | "message"
    | "rating";

  title: string;
  message: string;
}

export const createNotification = async (
  data: CreateNotificationParams
) => {
  return Notification.create(data);
};