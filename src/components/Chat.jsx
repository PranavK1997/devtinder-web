import { useEffect, useRef, useState } from "react";
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
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        time: new Date(createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, time },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-700 m-5 h-[80vh] rounded-xl flex flex-col bg-base-200">
      <h1 className="text-xl font-semibold p-4 border-b border-gray-700 text-white">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {messages.map((msg, index) => {
          const isSelf = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={`chat mb-3 ${isSelf ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header text-sm text-gray-400">
                {msg.firstName} {msg.lastName}
                <time className="ml-2 text-xs text-gray-500">{msg.time}</time>
              </div>
              <div
                className={`chat-bubble ${
                  isSelf ? "bg-blue-600" : "bg-gray-700"
                } text-white`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
