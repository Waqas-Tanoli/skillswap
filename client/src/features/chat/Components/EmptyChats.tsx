import { MessageCircle } from "lucide-react";

export default function EmptyChats() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <MessageCircle
        className="text-gray-300"
        size={70}
      />

      <h2 className="text-xl font-semibold">
        No conversations yet
      </h2>

      <p className="text-gray-500">
        Start a skill swap to begin chatting.
      </p>
    </div>
  );
}