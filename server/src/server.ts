import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
import { initSocket } from "./sockets/socket";
import dbConnect from "./config/db";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import swapRoutes from "./routes/swap.routes";
import matchRoutes from "./routes/match.route";
import skillRoutes from "./routes/skills.route";
import {seedSkills} from "./utils/seeds/seedSkills";
import chatRoutes from "./routes/chat.route";
import ratingRoutes from "./routes/rating.route";
import notificationRoutes from "./routes/notification.route"; 
import dashboardRoutes from "./routes/dashboard.route";
import adminRoutes from "./routes/admin.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { seedDatabase } from "./utils/seeds";


const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const server = http.createServer(app);
initSocket(server);


const startServer = async () => {
  try {
    await dbConnect();
   await seedDatabase();
   
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();