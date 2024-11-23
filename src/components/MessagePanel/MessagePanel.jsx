import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../api/auth";

export default function MessagingPanel() {
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);t(() => {
    getCurrentUser()
      .then(user => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    axios
      .get("http://localhost:8000/api/messages/", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [currentUser]);
  const sendMessage = () => {
    if (newMessageContent.trim() === "") return; 

    axios
      .post(
        "http://localhost:8000/api/messages/",
        {
          content: newMessageContent, 
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        setMessages([response.data, ...messages]);
        setNewMessageContent(""); 
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-black/80">
      <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto flex-1">
        {/* Messages List */}
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div key={message.id} className="p-3 bg-gray-700 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={message.user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="text-white font-semibold">{message.user.username}</span>
                  <p className="text-sm text-gray-400">{new Date(message.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-300">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input Section */}
      <div className="p-3 bg-gray-800">
        <input
          type="text"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)} 
          placeholder="Type a message..."
          className="w-full p-2 rounded bg-gray-600 text-white"
        />
        <button
          onClick={sendMessage}
          className="mt-2 p-2 bg-blue-500 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
