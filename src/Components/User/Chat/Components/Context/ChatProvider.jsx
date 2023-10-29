import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

function ChatUserProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const initialChatState = {
    _id: "",
    chatName: "",
    users: [],
    createdAt: "",
    updatedAt: "", 
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    setUser(userInfo);
    setSelectedChat(initialChatState);

    // if (!userInfo) navigate("/");
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatUserProvider;
