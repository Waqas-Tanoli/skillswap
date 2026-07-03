import type { Notification } from "../types";

type Props = {
  notifications: Notification[];
};

export default function   NotificationList({
  notifications,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Recent Notifications
      </h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">
          No notifications yet
        </p>
      )}

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="border-b pb-3"
          >
            <h3 className="font-semibold">
              {notification.title} 
            </h3>

            <p className="text-sm text-gray-600">
              {notification.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}