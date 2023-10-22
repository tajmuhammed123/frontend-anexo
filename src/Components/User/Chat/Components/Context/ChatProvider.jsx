import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext=createContext()

function ChatUserProvider({children}) {

    const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const initialChatState = {
    _id: '', // Set an appropriate initial value for _id
    chatName: '', // Set an appropriate initial value for chatName
    users: [], // Set an appropriate initial value for users
    createdAt: '', // Set an appropriate initial value for createdAt
    updatedAt: '', // Set an appropriate initial value for updatedAt
    // Add other properties as needed
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
  )
}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatUserProvider