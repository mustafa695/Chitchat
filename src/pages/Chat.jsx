import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages/ChatMessages";
import { io } from "socket.io-client";

const socket = io("https://chitchat-server-nine.vercel.app", {
  withCredentials: true,
});

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [user] = useState(() => {
    // Initialize state from localStorage
    return JSON.parse(localStorage.getItem("userData")) || null;
  });
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [chatUserData, setChatUserData] = useState(null);

  const [messagesData, setMessagesData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const [activeSideMenu, setActiveSideMenu] = useState("chat");

  useEffect(() => {
    if (user) {
      socket.on("connect", () => {
        console.log("connected with" + socket.id);
      });

      // Register the user
      socket.emit("register", user?._id);

      // Listen for incoming messages
      socket.on("newMessage", (message) => {
        if (selectedUser == message?.sender) {
          setMessagesData((prevMessages) => [...prevMessages, message]);
        }
      });

      //Get online users form listner
      socket.on("onlineUsers", (connectedUsers) => {
        setOnlineUsers(connectedUsers);
        console.log(connectedUsers, "====online users");
      });

      // Clean up the effect
      return () => {
        socket.off("connect"); // Cleanup
        socket.off("newMessage");
        socket.off("onlineUsers");
      };
    }
  }, [user, selectedUser]);

  const [userData] = useState([
    {
      _id: "66f57b8616cff19258e09afd",
      name: "John",
      email: "john@mail.com",
      password: "1111111",
      profileImage: "https://wwww.google.com",
      createdAt: "2024-09-26T15:19:34.683Z",
      __v: 0,
    },
    {
      _id: "66f586515255d9a8e8b8ff13",
      name: "Mike Hussy",
      email: "mike@mail.com",
      password: "1111111",
      profileImage: "https://wwww.google.com",
      createdAt: "2024-09-26T16:05:37.619Z",
      __v: 0,
    },
    {
      _id: "66f58c4f646507f6d650a053",
      name: "Sana X",
      email: "sana@mail.com",
      password: "1111111",
      profileImage: "https://wwww.google.com",
      createdAt: "2024-09-26T16:31:11.362Z",
      __v: 0,
    },
  ]);

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        user,
        messagesData,
        setMessagesData,
        onlineUsers,
        chatUserData,
        setChatUserData,
        socket,
        channelData,
        setChannelData,
        selectedChannel,
        setSelectedChannel,
        activeSideMenu,
        setActiveSideMenu,
      }}
    >
      <div className="flex">
        <Sidebar />

        <ChatList />

        <ChatMessages />
      </div>
    </ChatContext.Provider>
  );
};

export default Chat;
