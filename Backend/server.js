import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();
 
console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Test route to verify server is alive
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      serverSelectionTimeoutMS:5000
    });
    
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
 
 