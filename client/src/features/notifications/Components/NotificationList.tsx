import NotificationCard from "./NotificationCard";

import type { Notification } from "../types";

interface Props {
  notifications: Notification[];

  onRead: (id: string) => void;

  onDelete: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onRead,
  onDelete,
}: Props) {
  if (notifications.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-lg font-semibold">
          No Notifications
        </h2>

        <p className="mt-2 text-gray-500">
          You're all caught up.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(
        (notification) => (
          <NotificationCard
            key={notification._id}
            notification={
              notification
            }
            onRead={onRead}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}