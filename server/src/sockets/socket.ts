import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

import Message from "../models/message";
import { createNotification } from "../utils/createNotification";

interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // Socket authentication
  io.use((socket, next) => {
    try {
      const cookies = cookie.parseCookie(
        socket.handshake.headers.cookie || ""
      );

      const token = cookies.token;

      if (!token) {
        return next(
          new Error("Authentication required")
        );
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      socket.data.user = decoded;

      next();
    } catch (error) {
      console.error(
        "Socket authentication error:",
        error
      );

      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user as JwtPayload;

    console.log(
      `User connected: ${user.username} (${user.id})`
    );

    // Join a swap room
    socket.on(
  "join_room",
  (swapId: string) => {
    if (
      !socket.rooms.has(
        swapId
      )
    ) {
      socket.join(swapId);

      console.log(
        `${user.username} joined room ${swapId}`
      );
    }
  }
);
    // socket.on(
    //   "join_room",
    //   (swapId: string) => {
    //     socket.join(swapId);

    //     console.log(
    //       `${user.username} joined room ${swapId}`
    //     );
    //   }
    // );

    // Send a message
    socket.on("send_message", async (data) => {
  try {
    const {
      swapId,
      receiverId,
      message,
    } = data;

    const senderId =
      socket.data.user.id;

   const msg = await Message.create({
  swap: swapId,
  sender: senderId,
  receiver: receiverId,
  message,
});

const populatedMessage =
  await Message.findById(msg._id)
    .populate(
      "sender",
      "username avatar"
    )
    .populate(
      "receiver",
      "username avatar"
    );

    await createNotification({
      recipient: receiverId,
      sender: senderId,
      type: "message",
      title: "New Message",
      message:
        "You received a new message.",
    });

    io.to(swapId).emit(
      "receive_message",
      populatedMessage
    );
  } catch (error) {
    socket.emit("message_error", {
      message:
        "Failed to send message",
    });
  }
});

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${user.username}`
      );
    });
  });

  return io;
};