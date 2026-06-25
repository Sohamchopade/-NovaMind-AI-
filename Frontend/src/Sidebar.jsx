import {useState} from "react";
import "./Sidebar.css";
import{useContext} from"react";
import {MyContext} from"./MyContext";
import{useEffect} from"react";
import{v1 as uuidv1} from "uuid";


export default function Sidebar(){
const{allThreads,setallThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}=useContext(MyContext);

const getAllThreads=async()=>{
  try{

    const response=await fetch("http://localhost:3000/api/thread");
const res=await response.json();
const FilterData=res.map(thread=>({threadId:thread.threadId,title:thread.title}));
console.log(FilterData);
setallThreads(FilterData);
  }catch(err){
    console.log(err);
  }
};

useEffect(()=>{
getAllThreads();
},[currThreadId]);


const createNewChat=()=>{
setNewChat(true);
setPrompt("");
setReply(null);
setCurrThreadId(null);
setPrevChats([]);
}

const changeThread=async(newThreadId)=>{
setCurrThreadId(newThreadId);

try{
const response=await fetch(`http://localhost:3000/api/thread/${newThreadId}`);
const res=await response.json();
console.log(res);
setPrevChats(res);
setNewChat(false);
setReply(null);

}catch(err){
  console.log(err);
}

}

const deleteThread=async(threadId)=>{
  try{
const response=await fetch(`http://localhost:3000/api/thread/${threadId}`,{method:"DELETE"});
const res=await response.json();
console.log(res);

setallThreads(prev=>prev.filter(thread=>thread.threadId!==threadId));
if(threadId === currThreadId){
  createNewChat();
}

  }catch(err){
console.log(err);
  }
}

    return(
         <section className="sidebar">        
<button onClick={createNewChat}>
    <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
     <span><i className="fa-solid fa-pen-to-square"></i></span>
</button>

 {/* history */}
 <ul className="history">
     {
      allThreads?.map((thread,idx)=>(
 <li key={idx}
 onClick={(e)=>changeThread(thread.threadId)}
 className={thread.threadId===currThreadId ? "highlighted":""}
 >
  {thread.title}
 <i className="fa-solid fa-trash" 
 onClick={(e)=>{
e.stopPropagation();
deleteThread(thread.threadId);

 }}
 ></i>
 </li>
      ))
     }
 </ul>

  {/* sign */}
  <div className="sign">
<p>By ApnaCollege &hearts;</p>
  </div>
         </section>
    )
  }