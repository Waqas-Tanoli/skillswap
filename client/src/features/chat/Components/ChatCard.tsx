import { useNavigate } from "react-router-dom";

import type { ChatPreview } from "../types";

type Props = {
  chat: ChatPreview;
};

export default function ChatCard({
  chat,
}: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(`/chat/${chat.swapId}`)
      }
      className="flex w-full items-center gap-4 border-b p-4 transition hover:bg-gray-50"
    >
      <img
        src={
          chat.otherUser.avatar ||
          "/avatar.png"
        }
        alt={chat.otherUser.username}
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="flex flex-1 flex-col text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {chat.otherUser.username}
          </h3>

          <span className="text-xs text-gray-400">
            {new Date(
              chat.updatedAt
            ).toLocaleString()}
          </span>
        </div>

        <p className="truncate text-sm text-gray-500">
          {chat.lastMessage}
        </p>
      </div>

      {chat.unreadCount > 0 && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
          {chat.unreadCount}
        </div>
      )}
    </button>
  );
}