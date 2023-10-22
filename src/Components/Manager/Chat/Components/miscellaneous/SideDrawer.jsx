import { Button } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
// import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import UserList from "../Users/UserList";
import { axiosManagerInstance, axiosUserInstance } from '../../../../../Constants/axios';
import { toast } from 'react-toastify';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  console.log(user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
  };

  

  const handleSearch = async () => {
    if (!search) {
      GenerateError("Please enter something in search");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosManagerInstance.get(`/usersearch?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      const mangId=user.user._id
      const { data } = await axiosUserInstance.post(`/accesschat`, { mangId,userId }, config);
      console.log(data);

      if (!chats.find((c) => c._id === data._id)) {
        console.log('nothing');
        setChats([data, ...chats])}
      console.log(data,'data');
      console.log(chats,'chat');
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };

  return (
    <>
      {/* <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box> */}

      <>
      {/* Replace the following JSX with your desired HTML and React components */}
      <div className='p-3'>
        <label>
          Search by name or email:
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Go</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {searchResult?.map((user) => (
            <li key={user._id}>
              <button onClick={() => accessChat(user._id)}>
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {loadingChat && <div>Loading chat...</div>}
    </>
    </>
  );
}

export default SideDrawer;
