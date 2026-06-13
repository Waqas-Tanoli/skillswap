import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import dbConnect from "./config/db";
import authRoutes from "./routes/auth.route";

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();