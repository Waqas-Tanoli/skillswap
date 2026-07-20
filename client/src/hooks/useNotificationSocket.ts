import { useEffect } from "react";

import { socket } from "../lib/socket";

import { toast } from "react-toastify";

import { useNotificationStore } from "../store/notificationStore";

export default function useNotificationSocket() {
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    socket.on("new_notification", (notification) => {
      toast.info(notification.title);

      fetchNotifications();
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);
}
