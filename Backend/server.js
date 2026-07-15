 import dotenv from "dotenv";
// 1. Force dotenv to initialize BEFORE any other local imports run
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";

// 2. Keep the Node DNS fix active so the network block doesn't return
dns.setServers(['8.8.8.8', '8.8.4.4']);

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes); // Cleaned up the duplicate route listener you had here

// Test route to verify server is alive
app.get("/", (req, res) => {
  res.send("Server is working");
});

const connectDB = async () => {
  try {
    // Double check that the variable actually exists before passing it to Mongoose
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is completely missing from your environment variables.");
    }

    // Simplified connection setup (modern Mongoose handles timeouts natively)
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("Connected with Database");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();

setInterval(() => {
  console.log("Server heartbeat...");
}, 5000);