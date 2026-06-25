import { useState } from 'react';
import ChatWindow from './ChatWindow.jsx';
import Sidebar from './Sidebar.jsx';
import './App.css'
import{MyContext}from "./MyContext.jsx";
import{v1 as uuidv1} from "uuid";

function App(){
const[prompt,setPrompt]=useState("");
const[reply,setReply]=useState(null);
const [currThreadId, setCurrThreadId] = useState(null);
const[prevChats,setPrevChats]=useState([]);
const[newChat,setNewChat]=useState(true);
const[allThreads,setallThreads]=useState([]);

 const providerValues = {
  prompt, setPrompt,
  reply, setReply,
  currThreadId,
  setCurrThreadId: setCurrThreadId,
  newChat,setNewChat,
  prevChats,setPrevChats,
  allThreads,setallThreads,
};
 
  return (
     <div className='app'>
      <MyContext.Provider value={providerValues}>
<Sidebar/> 
<ChatWindow/> 
</MyContext.Provider> 
 
 
    </div>
    
  );
}

export default App;
