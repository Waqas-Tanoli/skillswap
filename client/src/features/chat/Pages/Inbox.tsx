import { useEffect, useState } from "react";

import DashboardLayout from "../../../layouts/DashboardLayout";

import ChatList from "../Components/ChatList";
import EmptyChats from "../Components/EmptyChats";

import { getMyChats } from "../api";

import type { ChatPreview } from "../types";

export default function ChatsPage() {
  const [loading, setLoading] =
    useState(true);

  const [chats, setChats] =
    useState<ChatPreview[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data =
          await getMyChats();

        setChats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold">
            Chats
          </h1>

          <p className="text-sm text-gray-500">
            Your conversations
          </p>
        </div>

        {chats.length === 0 ? (
          <EmptyChats />
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
    </DashboardLayout>
  );
}