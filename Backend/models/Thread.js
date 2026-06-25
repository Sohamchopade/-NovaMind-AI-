 import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const ThreadSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: "New chat"
  },
  messages: [messageSchema]
}, { timestamps: true });  

export default mongoose.model("Thread", ThreadSchema);