import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";
import { useAuthStore } from "../../../store/authStore";

import { useChat } from "../hooks";
import { getSwapById } from "../api";

import ChatWindow from "../Components/ChatWindow";
import MessageInput from "../Components/MessageInput";

import type { Swap } from "../../swaps/types";

export default function ChatPage() {
  const { swapId } = useParams();

  const user = useAuthStore(
    (state) => state.user
  );

  // ===== DEBUG LOGS =====
  console.log(
    "AUTH USER FROM STORE:",
    user
  );

  console.log(
    "USER ID:",
    user?.id
  );
  // ======================

  const [swap, setSwap] =
    useState<Swap | null>(null);

  const [swapLoading, setSwapLoading] =
    useState(true);

  const {
    messages,
    loading,
  } = useChat(swapId!);

  useEffect(() => {
    const fetchSwap = async () => {
      try {
        const data =
          await getSwapById(
            swapId!
          );

        console.log(
          "SWAP DATA:",
          data
        );

        setSwap(data);
      } catch (error) {
        console.error(
          "GET SWAP ERROR:",
          error
        );
      } finally {
        setSwapLoading(false);
      }
    };

    fetchSwap();
  }, [swapId]);

  if (loading || swapLoading) {
    return (
      <DashboardLayout>
        Loading chat...
      </DashboardLayout>
    );
  }

  if (!swap || !user) {
    return (
      <DashboardLayout>
        Chat not found.
      </DashboardLayout>
    );
  }

  const receiverId =
    swap.sender._id === user.id
      ? swap.receiver._id
      : swap.sender._id;

  console.log(
    "CURRENT USER ID:",
    user.id
  );

  console.log(
    "RECEIVER ID:",
    receiverId
  );

  return (
    <DashboardLayout>
      <div className="flex h-[80vh] flex-col overflow-hidden rounded-2xl bg-white shadow">
        <div className="border-b p-5">
          <h1 className="text-2xl font-bold">
            Chat
          </h1>

          <p className="text-sm text-gray-500">
            Skill Swap Conversation
          </p>
        </div>

        <ChatWindow
          messages={messages}
          currentUserId={
            user.id
          }
        />

        <MessageInput
          swapId={swapId!}
          receiverId={receiverId}
        />
      </div>
    </DashboardLayout>
  );
}