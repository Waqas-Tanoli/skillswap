import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types";

type Props = {
  messages: ChatMessage[];
  currentUserId: string;
};

export default function ChatWindow({
  messages,
  currentUserId,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No messages yet. Start the conversation!
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}