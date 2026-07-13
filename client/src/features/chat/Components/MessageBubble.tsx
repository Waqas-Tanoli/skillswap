

import type { ChatMessage } from "../types";

type Props = {
  message: ChatMessage;
  currentUserId: string;
};

export default function MessageBubble({
  message,
  currentUserId,
}: Props) {
  console.log("MESSAGE:", message);
  console.log(
    "SENDER ID:",
    message.sender?._id
  );
  console.log(
    "CURRENT USER ID:",
    currentUserId
  );

  const isMine =
    message.sender?._id?.toString() ===
    currentUserId?.toString();

  console.log("IS MINE:", isMine);

  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-md rounded-2xl px-4 py-3 ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        {!isMine && (
          <p className="mb-1 text-xs font-semibold">
            {message.sender?.username}
          </p>
        )}

        <p>{message.message}</p>

        <p
          className={`mt-2 text-right text-xs ${
            isMine
              ? "text-blue-100"
              : "text-gray-500"
          }`}
        >
          {new Date(
            message.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}