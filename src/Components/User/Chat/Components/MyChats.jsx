import { Box, Stack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { axiosUserInstance } from "../../../../Constants/axios";
import { ChatState } from "./Context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import SideDrawer from "./miscellaneous/SideDrawer";
import Spinner from "../../../../Spinner";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const GenerateError = (err) => {
    toast.success(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoString);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const userId = user.user._id;
      const { data } = await axiosUserInstance.get(
        `/fetchchat/${userId}`,
        config
      );
      setChats(data);
      setIsLoading(false);
    } catch (error) {
      GenerateError("Select a person to Chat");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box
            pb={3}
            px={3}
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"
            display="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            My Chats
          </Box>
          <Box>{user && <SideDrawer />}</Box>
        </Box>
        <Box
          display="flex"
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
                  display="flex"
                >
                  <Box>
                    <img
                      src={
                        chat.users.manager.profile_img
                          ? chat.users.manager.profile_img
                          : "https://www.clipartmax.com/png/small/54-546487_a-little-over-a-month-ago-i-had-lasik-surgery-user-profile.png"
                      }
                      className="h-10 w-10 me-3 rounded-full"
                    />
                  </Box>
                  <Box>
                    <Text>{chat.users.manager.name}</Text>
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
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default MyChats;
