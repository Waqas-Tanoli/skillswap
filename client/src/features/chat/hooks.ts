import { useEffect, useState } from "react";

import { getChatMessages } from "./api";
import { socket } from "./socket";

import type { ChatMessage } from "./types";

export const useChat = (swapId: string) => {
  const [messages, setMessages] = useState<
    ChatMessage[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const data =
          await getChatMessages(
            swapId
          );

        setMessages(data);

        if (!socket.connected) {
          socket.connect();
        }

        socket.emit(
          "join_room",
          swapId
        );

        // Remove old listener first
        socket.off(
          "receive_message"
        );

        // Add fresh listener
        socket.on(
          "receive_message",
          (
            newMessage: ChatMessage
          ) => {
            console.log(
              "NEW MESSAGE:",
              newMessage
            );

            setMessages(
              (prev) => {
                // Prevent duplicates
                const exists =
                  prev.some(
                    (msg) =>
                      msg._id ===
                      newMessage._id
                  );

                if (exists)
                  return prev;

                return [
                  ...prev,
                  newMessage,
                ];
              }
            );
          }
        );
      } catch (error) {
        console.error(
          "Chat initialization failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    initialize();

    return () => {
      socket.off(
        "receive_message"
      );
    };
  }, [swapId]);

  return {
    messages,
    loading,
  };
};