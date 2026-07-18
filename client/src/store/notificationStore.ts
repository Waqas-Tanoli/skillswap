import { create } from "zustand";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../features/notifications/api";

import type { Notification } from "../features/notifications/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;

  fetchNotifications: () => Promise<void>;

  markAsRead: (id: string) => Promise<void>;

  markAllAsRead: () => Promise<void>;

  removeNotification: (id: string) => Promise<void>;

  addNotification: (notification: Notification) => void;

  clearNotifications: () => void;
}

export const useNotificationStore =
  create<NotificationState>((set) => ({
    notifications: [],

    unreadCount: 0,

    loading: false,

    fetchNotifications: async () => {
      set({ loading: true });

      try {
        const [notifications, unreadCount] =
          await Promise.all([
            getNotifications(),
            getUnreadCount(),
          ]);

        set({
          notifications,
          unreadCount,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    markAsRead: async (id) => {
      try {
        await markNotificationAsRead(id);

        set((state) => ({
          notifications:
            state.notifications.map((notification) =>
              notification._id === id
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
            ),

          unreadCount:
            state.notifications.find(
              (notification) =>
                notification._id === id &&
                !notification.isRead
            )
              ? Math.max(
                  0,
                  state.unreadCount - 1
                )
              : state.unreadCount,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    markAllAsRead: async () => {
      try {
        await markAllNotificationsAsRead();

        set((state) => ({
          notifications:
            state.notifications.map((notification) => ({
              ...notification,
              isRead: true,
            })),

          unreadCount: 0,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    removeNotification: async (id) => {
      try {
        await deleteNotification(id);

        set((state) => {
          const deleted =
            state.notifications.find(
              (notification) =>
                notification._id === id
            );

          return {
            notifications:
              state.notifications.filter(
                (notification) =>
                  notification._id !== id
              ),

            unreadCount:
              deleted && !deleted.isRead
                ? Math.max(
                    0,
                    state.unreadCount - 1
                  )
                : state.unreadCount,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    addNotification: (notification) => {
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],

        unreadCount:
          state.unreadCount + 1,
      }));
    },

    clearNotifications: () => {
      set({
        notifications: [],
        unreadCount: 0,
      });
    },
  }));

  