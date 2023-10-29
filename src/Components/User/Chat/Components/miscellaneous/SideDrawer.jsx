import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Drawer,
  Typography,
  Input,
  Card,
} from "@material-tailwind/react";

import { axiosUserInstance } from "../../../../../Constants/axios";
import { toast } from "react-toastify";
import { ChatState } from "../Context/ChatProvider";
import Spinner from "../../../../../Spinner";

function SideDrawer() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      GenerateError("Error Occured!,Failed to Load the Messages");
      return;
    }

    try {
      setLoading(true);

      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoString);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };

      const { data } = await axiosUserInstance.get(
        `/usersearch?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      GenerateError("Error Occured!,Failed to Load the Messages");
    }
  };

  const accessChat = async (mangId) => {
    console.log(mangId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
      };
      const userId = user.user._id;
      const { data } = await axiosUserInstance.post(
        `/accesschat`,
        { mangId, userId },
        config
      );
      console.log(data);

      if (!chats.find((c) => c._id === data._id)) {
        console.log("nothing");
        setChats([data, ...chats]);
      }
      console.log(data, "data");
      console.log(chats, "chat");
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <>
        <div
          onClick={openDrawer}
          className="flex bg-blue-gray-400 p-1 rounded-3xl cursor-pointer"
        >
          <Typography className="mx-3 ">search</Typography>
          <MagnifyingGlassIcon className="h-6 w-6 me-3" />
        </div>
        <Drawer open={open} onClose={closeDrawer}>
          <div className="p-5">
            <Input
              className=""
              label="Search by name or email:"
              type="text"
              variant="standard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>Go</button>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {searchResult?.map((user) => (
                <Card key={user._id} className="bg-blue-gray-200">
                  <button onClick={() => accessChat(user._id)}>
                    {user.name}
                  </button>
                </Card>
              ))}
            </div>
          )}
          {loadingChat && <div>Loading chat...</div>}
        </Drawer>
      </>
    </>
  );
}

export default SideDrawer;
