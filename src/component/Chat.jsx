import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null); // 👈 added

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials : true
    });
    console.log(chat.data.messages); 

    const chatMessages = chat?.data?.messages.map(msg => {

      const {senderId, text} = msg;

      return {
        firstName: senderId?.firstName, 
        lastName: senderId?.lastName, 
        text: text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);


  useEffect(() => {
  if (!user || !userId || !targetUserId) return; 

  const socket = createSocketConnection();
  socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

  socket.on("messageReceived", ({ firstName,lastName, text }) => {
    console.log(firstName + " : " + text);
    setMessages((messages) => [...messages, { firstName,lastName, text }]);
  });

  return () => {
    socket.disconnect();
  };
}, [user, userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 👈 auto-scroll
  }, [messages]);

    const sendMessage = () => {
      if (!user || !newMessage.trim()) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage" , {
            firstName : user.firstName, 
            lastName : user.lastName,
            userId, 
            targetUserId, 
            text: newMessage
        });
        setNewMessage("");
    }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
                <div
                  key={index}
                  className={`chat ${user?.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header">
                    {`${msg.firstName || ""} ${msg.lastName || ""}`}
                    <time className="text-xs opacity-50 ml-2">2 hours ago</time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      user?.firstName === msg.firstName
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              );
        })}
        <div ref={messagesEndRef} /> {/* 👈 scroll target */}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center">
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border border-gray-500 text-white" />
        <button onClick={sendMessage} className="btn btn-secondary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
