import { useEffect } from "react";
import { BellRing, CheckCheck } from "lucide-react";

import DashboardLayout from "../../../layouts/DashboardLayout";



import { useNotificationStore } from "../../../store/notificationStore";
import NotificationList from "../Components/NotificationList";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-blue-100 p-3">

              <BellRing
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">
                Notifications
              </h1>

              <p className="text-gray-500">
                You have{" "}
                <span className="font-semibold text-blue-600">
                  {unreadCount}
                </span>{" "}
                unread notification
                {unreadCount !== 1 && "s"}.
              </p>

            </div>

          </div>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              <CheckCheck size={18} />

              Mark All Read
            </button>
          )}
        </div>

        {/* Notification List */}

        <NotificationList
          notifications={notifications}
          onRead={markAsRead}
          onDelete={removeNotification}
        />

      </div>
    </DashboardLayout>
  );
}