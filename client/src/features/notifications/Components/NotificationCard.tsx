import { Trash2 } from "lucide-react";

import type { Notification } from "../types";

interface Props {
  notification: Notification;

  onRead: (id: string) => void;

  onDelete: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onRead,
  onDelete,
}: Props) {
  return (
    <div
      className={`rounded-xl border p-4 transition hover:shadow-md ${
        notification.isRead
          ? "bg-white"
          : "border-blue-300 bg-blue-50"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {notification.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() =>
            onDelete(notification._id)
          }
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {!notification.isRead && (
        <button
          onClick={() =>
            onRead(notification._id)
          }
          className="mt-3 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}