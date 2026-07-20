import Notification from "../models/notification";
import { getIO } from "../sockets/socket";

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
  const notification =
    await Notification.create(data);

  const io = getIO();

  io.to(data.recipient).emit(
    "new_notification",
    notification
  );

  return notification;
};