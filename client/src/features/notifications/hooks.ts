// import { useEffect, useState } from "react";

// import {
//   deleteNotification,
//   getNotifications,
//   getUnreadCount,
//   markAllNotificationsAsRead,
//   markNotificationAsRead,
// } from "./api";

// import type { Notification } from "./types";

// export const useNotifications = () => {
//   const [notifications, setNotifications] =
//     useState<Notification[]>([]);

//   const [unreadCount, setUnreadCount] =
//     useState(0);

//   const [loading, setLoading] =
//     useState(true);

//   const fetchNotifications =
//     async () => {
//       try {
//         const [
//           notificationData,
//           unread,
//         ] = await Promise.all([
//           getNotifications(),
//           getUnreadCount(),
//         ]);

//         setNotifications(
//           notificationData
//         );

//         setUnreadCount(unread);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const markAsRead = async (
//     id: string
//   ) => {
//     try {
//       await markNotificationAsRead(
//         id
//       );

//       setNotifications(
//         (prev) =>
//           prev.map((n) =>
//             n._id === id
//               ? {
//                   ...n,
//                   isRead: true,
//                 }
//               : n
//           )
//       );

//       setUnreadCount((prev) =>
//         Math.max(0, prev - 1)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const markAllAsRead =
//     async () => {
//       try {
//         await markAllNotificationsAsRead();

//         setNotifications(
//           (prev) =>
//             prev.map((n) => ({
//               ...n,
//               isRead: true,
//             }))
//         );

//         setUnreadCount(0);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   const removeNotification =
//     async (id: string) => {
//       try {
//         await deleteNotification(id);

//         setNotifications(
//           (prev) =>
//             prev.filter(
//               (n) =>
//                 n._id !== id
//             )
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   return {
//     notifications,
//     unreadCount,
//     loading,

//     refresh:
//       fetchNotifications,

//     markAsRead,

//     markAllAsRead,

//     removeNotification,
//   };
// };