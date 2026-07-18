import { Bell } from "lucide-react";

import NotificationBadge from "./NotificationBadge";

interface Props {
  unreadCount: number;

  onClick: () => void;
}

export default function NotificationBell({
  unreadCount,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl p-2 transition hover:bg-gray-100"
    >
      <Bell size={24} />

      <NotificationBadge
        count={unreadCount}
      />
    </button>
  );
}