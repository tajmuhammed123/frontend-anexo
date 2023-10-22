import React, { useEffect, useRef } from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChatState } from "./Context/ChatProvider";
import {   
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser, 
} from "../Config/ChatLogistics";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, user.user._id) ||
              isLastMessage(messages, i, user.user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                {m.sender.pic ? (
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                ) : (
                  <Avatar
                    mt="7px"
                    mr={1}
                    width={"8"}
                    height={"8"}
                    size="2px"
                    cursor="pointer"
                    name={m.sender.name}
                    src='https://www.clipartmax.com/png/small/54-546487_a-little-over-a-month-ago-i-had-lasik-surgery-user-profile.png'
                  />
                )}
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.user
                    ? m.sender.user._id === user.user._id
                      ? "#BEE3F8"
                      : "#B9F5D0"
                    : m.sender.manager._id === user.user._id
                    ? "#BEE3F8"
                    : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
