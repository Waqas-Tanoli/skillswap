import { useState } from "react";

import { socket } from "../socket";

type Props = {
  swapId: string;

  receiverId: string;
};

export default function MessageInput({
  swapId,
  receiverId,
}: Props) {
  const [message, setMessage] =
    useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    socket.emit(
      "send_message",
      {
        swapId,
        receiverId,
        message,
      }
    );

    setMessage("");
  };

  return (
    <div className="flex gap-3 border-t p-4">
      <input
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        className="flex-1 rounded-xl border p-3"
        placeholder="Type message..."
      />

      <button
        onClick={handleSend}
        className="rounded-xl bg-blue-600 px-6 text-white"
      >
        Send
      </button>
    </div>
  );
}