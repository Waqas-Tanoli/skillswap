import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import Message from "../models/message";
import { createNotification } from "../utils/createNotification";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Authenticate socket user
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      socket.data.user = decoded;

      next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.data.user.id);

    // Join swap room
    socket.on("join_room", (swapId) => {
      socket.join(swapId);
    });

    // Handle sending messages
   socket.on("send_message", async (data) => {
  try {
    const { swapId, receiverId, message } = data;

    const senderId = socket.data.user.id;

    const msg = await Message.create({
      swap: swapId,
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await createNotification({
      recipient: receiverId,
      sender: senderId,
      type: "message",
      title: "New Message",
      message: "You received a new message.",
    });

    io.to(swapId).emit("receive_message", msg);
  } catch (error) {
    socket.emit("message_error", {
      message: "Failed to send message",
    });
  }
});

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};