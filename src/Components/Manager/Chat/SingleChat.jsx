import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./style.css";
import io from "socket.io-client";
import { ChatState } from "./Components/Context/ChatProvider";
import animationData from "./TypingAnimation/typing.json";
import {
  axiosManagerInstance,
  axiosUserInstance,
} from "../../../Constants/axios";
import ScrollableChat from "./Components/ScrollableChat";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
const ENDPOINT = import.meta.env.VITE_USER_ROUTE;
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const managerData = localStorage.getItem("managerInfo");
      const managerInfo = JSON.parse(managerData);
      const config = {
        headers: {
          Authorization: `Bearer ${managerInfo.token.token}`,
        },
      };

      setLoading(true);
      const { data } = await axiosUserInstance.get(
        `/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const managerData = localStorage.getItem("managerInfo");
        const managerInfo = JSON.parse(managerData);
        const config = {
          headers: {
            Authorization: `Bearer ${managerInfo.token.token}`,
            "Content-type": "application/json",
          },
        };
        setNewMessage("");
        const { data } = await axiosManagerInstance.post(
          "/message",
          {
            content: newMessage,
            chatId: selectedChat,
            userId: user.user._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        GenerateError("Error Occured!,Failed to Load the Messages");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageReceived) => {

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    };

    socket.on("message received", handleNewMessageReceived);

    return () => {
      socket.off("message received", handleNewMessageReceived);
    };
  }, [selectedChatCompare, notification, fetchAgain, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const isMessageSender = (currentUser, selectedChat) => {
    return (
      selectedChat.sender && currentUser.manager._id === selectedChat.sender._id
    );
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat.users.user && selectedChat.users.user.name}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            className="flex flex-end flex-col"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages overflow-hidden">
                <ScrollableChat messages={messages} user={user} />
              </div>
            )}
            {istyping && !isMessageSender(user, selectedChat) ? (
              <div>
                <p style={{ marginBottom: 8, marginLeft: 0, color: "gray" }}>
                  Typing...
                </p>
              </div>
            ) : (
              <></>
            )}
            <FormControl className="w-full pt-3" id="first-name" isRequired>
              <div className="relative flex w-full">
                <Input
                  className="w-full"
                  borderRadius={15}
                  bg="#E0E0E0"
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
