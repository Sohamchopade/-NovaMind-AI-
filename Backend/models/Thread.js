import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const threadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    threadId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },

    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Thread", threadSchema);