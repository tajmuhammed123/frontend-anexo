import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { Button } from "@chakra-ui/react";
import { axiosUserInstance } from "../../../../Constants/axios";
import { ChatState } from "./Context/ChatProvider";
import { getSender } from "../Config/ChatLogistics";
import { ToastContainer, toast } from "react-toastify";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  
  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(selectedChat);
      const userId=user.user._id
      const { data } = await axiosUserInstance.get(`/fetchchat/${userId}`, config);
      console.log(data);
      setChats(data);
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };
  

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {chat.users.manager.name}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>
                      {chat.latestMessage.sender.manager
                        ? chat.latestMessage.sender.manager.name
                        : chat.latestMessage.sender.user.name}
                      :
                    </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
    <ToastContainer/>
    </>
  );
};

export default MyChats;
