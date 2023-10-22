import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "./Components/Context/ChatProvider";
import SideDrawer from "./Components/miscellaneous/SideDrawer";
import MyChats from "./Components/MyChats";
import Chatbox from "./Components/Chatbox";

const ChatList = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box w="100%" h="91.5vh" p="10px" className="flex justify-between p-5">
        {user && <MyChats fetchAgain={fetchAgain} className="flex h-9" />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} className="flex h-9" />
        )}
      </Box>
    </div>
  );
};

export default ChatList;
