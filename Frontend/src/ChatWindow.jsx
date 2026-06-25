import {useContext, useState,useEffect} from "react";
import "./ChatWindow.css"
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import{ScaleLoader} from "react-spinners";


export default function ChatWindow(){

     const {
  prompt,
  setPrompt,
  reply,
  setReply,
  currThreadId,
  setCurrThreadId ,
  prevChats,setPrevChats,
  setNewChat,
} = useContext(MyContext);

const[loading, setLoading]=useState(false);
const[isOpen,setIsOpen]=useState(false);

    const getReply=async()=>{
        setLoading(true);
        setNewChat(false);
        console.log("message",prompt,"threadId",currThreadId);
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
message:prompt,
threadId:currThreadId

            }),
        };

        try{
 const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/chat`,
  options
);
const data = await response.json();

    console.log("Response Data:", data);
  if (!currThreadId && data.threadId) {
      setCurrThreadId(data.threadId);
    }

    setReply(data.reply);

        }catch(err){
            console.log(err);
        }

        setLoading(false);
    }

//Append new chat to prevChats

useEffect(()=>{
    if(prompt&&reply){
        setPrevChats(prevChats=>(
            [...prevChats,{
                role:"user",
                content:prompt
            },{

                role:"assistant",
                content:reply
            }]
        ))
    }
    setPrompt("");
},[reply]);

const handleProfileClick=()=>{
    setIsOpen(!isOpen);
}

    return(
        <div className="chatWindow">
        <div className="navbar"> 
<span>SigmaGpt  
 <i className="fa-solid fa-angle-down"></i></span>
 <div className="userIconDiv" onClick={handleProfileClick}> 
 <span className="userIcon"><i className="fa-solid fa-user"></i></span> 
 </div>
        </div>

{
    isOpen&&
    <div className="dropDown">
 
 <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
 <br></br>
      <div className="dropDownItem"><i class="fa-solid fa-arrow-up"></i>Upgrade plan</div>
       <br></br>
 <div className="dropDownItem"><i class="fa-solid fa-right-from-bracket"></i>Log out</div>

    </div>

}

        <Chat></Chat>
        <div className="loader-container"> 
<ScaleLoader color="#ffff" loading={loading}>

</ScaleLoader>
</div>

 <div className="chatInput">
<div className="inputBox">
    <input placeholder="Ask anything"
    value={prompt}
    onChange={(e)=>setPrompt(e.target.value)}
>
    </input>
    <div id="submit" onClick={getReply}>
<i className="fa-solid fa-paper-plane"></i>
    </div>
</div>
<p className="info">
SigmaGpt can make mistakes Check important info.see Cookie Preferences.
</p>
 </div>
          </div>
    )
}