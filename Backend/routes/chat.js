import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Test Route
router.get("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing New Thread",
        });

        const response = await thread.save();

        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in DB" });
    }
});

// Get all threads of logged-in user
router.get("/thread", authMiddleware, async (req, res) => {
    try {

        const threads = await Thread.find({
            user: req.user.id
        }).sort({ updatedAt: -1 });

        res.json(threads);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }
});

// Get single thread
router.get("/thread/:threadId", authMiddleware, async (req, res) => {

    const { threadId } = req.params;

    try {

        const thread = await Thread.findOne({
            threadId,
            user: req.user.id
        });

        if (!thread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        const sortedMessages = thread.messages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        res.json(sortedMessages);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// Delete Thread
router.delete("/thread/:threadId", authMiddleware, async (req, res) => {

    const { threadId } = req.params;

    try {

        const deletedThread = await Thread.findOneAndDelete({
            threadId,
            user: req.user.id
        });

        if (!deletedThread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        res.json({
            message: "Thread deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// Chat Route
router.post("/chat", authMiddleware, async (req, res) => {

    const { threadId, message } = req.body;

    if (!message) {
        return res.status(400).json({
            error: "Message is required"
        });
    }

    try {

        let thread;

        if (!threadId) {

            thread = new Thread({
                user: req.user.id,
                threadId: Date.now().toString(),
                title: message,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            });

        } else {

            thread = await Thread.findOne({
                threadId,
                user: req.user.id
            });

            if (!thread) {
                return res.status(404).json({
                    error: "Thread not found"
                });
            }

            thread.messages.push({
                role: "user",
                content: message
            });

        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({
            role: "assistant",
            content: assistantReply
        });

        thread.updatedAt = new Date();

        await thread.save();

        res.json({
            reply: assistantReply,
            threadId: thread.threadId
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});

export default router;