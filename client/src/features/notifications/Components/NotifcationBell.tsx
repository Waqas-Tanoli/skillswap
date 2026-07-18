import { useNavigate } from "react-router-dom";

import { Bell } from "lucide-react";

import NotificationBadge from "./NotificationBadge";

interface Props {
  unreadCount: number;
}

export default function NotificationBell({
  unreadCount,
}: Props) {

  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate("/notifications")
      }
      className="relative rounded-xl p-2 transition hover:bg-gray-100"
    >
      <Bell size={24} />

      <NotificationBadge
        count={unreadCount}
      />
    </button>
  );
}