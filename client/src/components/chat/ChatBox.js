import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  PseudoBox,
  Flex,
  Stack,
} from "@chakra-ui/core";

import Messages from "./Messages";

const socket = io("ws://localhost:3001");

export const ChatBox = () => {
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const params = {
    name: "migom",
    room: "React JS",
  };

  useEffect(() => {
    socket.emit("join", params, function (err) {
      if (err) {
        console.log(err);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("updateUserList", function (users) {
      setUsers(users);
    });

    socket.on("newMessage", (message) => {
      var formattedTime = moment(message.createdDate).format("h:mm a");
      let newMsg = {
        text: message.text,
        from: message.from,
        room: message.room,
        createdDate: formattedTime,
      };

      console.log(message);
      console.log(messages.length);
      setMessages((oldMessages) => [newMsg, ...oldMessages]);
    });

    return () => {
      socket.emit("leave", params);
    };
    // eslint-disable-next-line
  }, []);

  const clearForm = () => {
    setMsg("");
  };

  const inputUpdate = (e) => {
    const value = e.target.value;
    setMsg(value);
  };

  const send = (e) => {
    e.preventDefault();
    var obj = {
      text: msg,
    };
    socket.emit("createMessage", obj, function (data) {});
    clearForm();
  };

  const onEmojiClick = (event, emojiObject) => {
    setMsg((msg) => msg + emojiObject.emoji);
  };

  // div chat-box
  return (
    <Stack h={"100%"} w={"100%"} borderRadius="2em" bg={"gray.800"} px={"1em"}>
      <Messages messages={messages} room={params.room} />
      <Flex
        h={"60px"}
        as="form"
        onSubmit={send}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Popover trigger="hover">
          <PopoverTrigger>
            <PseudoBox
              as="button"
              paddingRight="0.5em"
              rounded="50%"
              fontWeight="semibold"
              color="#4b4f56"
            >
              🤩
            </PseudoBox>
          </PopoverTrigger>
          <PopoverContent zIndex={4} width={""}>
            <Picker
              onEmojiClick={onEmojiClick}
              skinTone={SKIN_TONE_MEDIUM_DARK}
            />
          </PopoverContent>
        </Popover>
        <Input
          borderRadius={"15px"}
          variant="filled"
          color="white"
          size="sm"
          name="newMsg"
          value={msg}
          onChange={inputUpdate}
          placeholder={`${users} users online...`}
          autoComplete="off"
        />
      </Flex>
    </Stack>
  );
};
