 import { useContext, useEffect } from "react";
import logo from "./assets/blacklogo.png";
import "./Sidebar.css";
import { MyContext } from "./MyContext";

export default function Sidebar() {

  const {
    allThreads,
    setallThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats
  } = useContext(MyContext);

  const token = localStorage.getItem("token");

  const getAllThreads = async () => {
    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/thread`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await response.json();

      const filterData = res.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }));

      setallThreads(filterData);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(null);
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {

    setCurrThreadId(newThreadId);

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/thread/${newThreadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await response.json();

      setPrevChats(res);
      setNewChat(false);
      setReply(null);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/thread/${threadId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await response.json();

      console.log(res);

      setallThreads(prev =>
        prev.filter(thread => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }

    } catch (err) {
      console.log(err);
    }
  };

   

  return (
    <section className="sidebar">

     <button className="newChatBtn" onClick={createNewChat}>
    <img src={logo} alt="SigmaGPT" className="logo" />

    <span className="newChatText">New Chat</span>

</button>
<br />

<span className="chats">Chats</span>
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={
              thread.threadId === currThreadId
                ? "highlighted"
                : ""
            }
          >
            {thread.title}

            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>

          </li>
        ))}
      </ul>

       
<div class="op"> 
      <div className="sign">
        <p>By Soham &hearts;</p>
      </div>
</div>
    </section>
  );
}