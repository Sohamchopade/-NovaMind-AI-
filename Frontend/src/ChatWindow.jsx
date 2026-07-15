import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";


export default function ChatWindow() {

  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  

  const user = JSON.parse(localStorage.getItem("user"));

  const getReply = async () => {

    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: prompt,
            threadId: currThreadId,
          }),
        }
      );

       if (response.status === 401) {
  alert("Please login first.");
  return;
}

      const data = await response.json();

      if (!currThreadId && data.threadId) {
        setCurrThreadId(data.threadId);
      }

      setReply(data.reply);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (prompt && reply) {

      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);

      setPrompt("");
    }

  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

   
  return (
    <div className="chatWindow">

      <div className="navbar">

        <span>
          SigmaGPT
          <i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>

          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>

           {user && (
  <span className="username">
    {user.username}
  </span>
)}
        </div>

      </div>

{isOpen && (
  <div className="dropDown">

    {user ? (
      <>
        <div className="profileInfo">
          <h3>{user.username}</h3>
          <p>{user.email}</p>
        </div>

        <hr />

        <div className="dropDownItem">
          <i className="fa-solid fa-gear"></i>
          Settings
        </div>

        <div className="dropDownItem">
          <i className="fa-solid fa-arrow-up"></i>
          Upgrade Plan
        </div>

        <div
          className="dropDownItem"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </div>
      </>
    ) : (
      <>
        <div
          className="dropDownItem"
          onClick={() => navigate("/login")}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
          Login
        </div>

        <div
          className="dropDownItem"
          onClick={() => navigate("/register")}
        >
          <i className="fa-solid fa-user-plus"></i>
          Register
        </div>
      </>
    )}

  </div>
)}
       
      <Chat />

      <div className="loader-container">
        <ScaleLoader color="#ffffff" loading={loading} />
      </div>

      <div className="chatInput">

        <div className="inputBox">

          <input
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>

        </div>

        <p className="info">
          SigmaGPT can make mistakes. Check important information before relying on it.
        </p>

      </div>

    </div>
  );
}