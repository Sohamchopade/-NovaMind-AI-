import express from"express";
import Thread from"../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router=express.Router();

//post route
router.get("/test",async(req,res)=>{
    try{
const thread=new Thread({
    threadId:"xyz",
    title:"Testing New Thread"
});

const response=await thread.save();
res.send(response);
    }catch (err){
console.log(err);
res.status(500).json({error:"failed to save in DB"})
    }
});

//get routes
  router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });  
    res.json(threads);
  } catch (err) {
    console.log("THREAD ERROR", err);
    res.status(500).json({ error: err.message });
  }
});

 router.get("/thread/:threadId", async(req,res)=>{
const {threadId}=req.params;

try{

const thread=await Thread.findOne({threadId});

if(!thread){
return res.status(404).json({error:"Thread not Found"});
}

const sortedMessages = thread.messages.sort(
(a,b)=> new Date(a.createdAt) - new Date(b.createdAt)
);

res.json(sortedMessages);

}catch(err){
console.log(err);
res.status(500).json({error:"failed to fetch chat"});
}
});


//delete route
router.delete("/thread/:threadId",async(req,res)=>{
    const{threadId}=req.params;
    try{
const deletedThread=await Thread.findOneAndDelete({threadId})

if(!deletedThread){
  return res.status(404).json({error:"Thread not Found"});
}
res.status(200).json({success:"Thread deleted sucessfully"})
    }catch(err){
console.log(err);
 res.status(500).json({error:"failed to delete thread"});
    }
});

//chat route

router.post("/chat", async (req, res) => {
      console.log("BODY RECEIVED:", req.body); 
    const { threadId, message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

    try {
        let thread;

        if (!threadId) {
            // Create new thread if no threadId
            thread = new Thread({
                threadId: new Date().getTime().toString(), // generate simple id
                title: message,
                messages: [{ role: "user", content: message }],
            });
        } else {
            thread = await Thread.findOne({ threadId });

            if (!thread) {
                return res.status(404).json({ error: "Thread not found" });
            }

            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        await thread.save();

        res.json({
            reply: assistantReply,
            threadId: thread.threadId,   
        });

    } catch (err) {
        console.log("CHAT ROUTE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});
  
export default router;