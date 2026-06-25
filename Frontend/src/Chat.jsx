import { useState, useContext, useEffect } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext.jsx";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {

const { newChat, prevChats, reply } = useContext(MyContext);
const [latestReply, setLatestReply] = useState(null);

useEffect(() => {

     if (!reply || typeof reply !== "string") {
    setLatestReply(null);
    return;
     }

if (!prevChats?.length) return;

const content = reply.split("");
let idx = 0;

const interval = setInterval(() => {

setLatestReply(content.slice(0, idx + 1).join(""));

idx++;

if (idx >= content.length) clearInterval(interval);

}, 40);

return () => clearInterval(interval);

}, [prevChats, reply]);

return (
<>
<div className="op">
{newChat && <h1>Start a New Chat!</h1>}
</div>

<div className="chats">

{prevChats?.map((chat, idx) => {

const isLast = idx === prevChats.length - 1;

return (
<div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>

{chat.role === "user" ? (

<p className="userMessage">{chat.content}</p>

) : isLast && latestReply ? (

<ReactMarkdown rehypePlugins={[rehypeHighlight]}>
{prevChats[prevChats.length-1].content}
</ReactMarkdown>

) : (

<ReactMarkdown rehypePlugins={[rehypeHighlight]}>
{chat.content}
</ReactMarkdown>

)}

</div>
);

})}

</div>
</>
);

}