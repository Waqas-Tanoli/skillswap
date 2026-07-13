import ChatCard from "./ChatCard";

import type { ChatPreview } from "../types";

type Props = {
  chats: ChatPreview[];
};

export default function ChatList({
  chats,
}: Props) {
  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <ChatCard
          key={chat.swapId}
          chat={chat}
        />
      ))}
    </div>
  );
}