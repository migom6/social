import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { Menu, Dropdown, Button } from "antd";

import Messages from "./Messages";

const socket = io("ws://localhost:3001");

export const ChatBox = () => {
  const [users, setUsers] = useState([]);
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

  const newMessage = (e) => {
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
    <div id="chat-box">
      <Messages messages={messages} room={params.room} />

      <form onSubmit={newMessage}>
        <Dropdown
          overlay={() => (
            <Picker
              onEmojiClick={onEmojiClick}
              skinTone={SKIN_TONE_MEDIUM_DARK}
            />
          )}
          placement="topCenter"
        >
          <span id="btn-emoji">🤩</span>
        </Dropdown>
        <input
          name="newMsg"
          placeholder="Type your message..."
          autoComplete="off"
          value={msg}
          onChange={inputUpdate}
        />

        <button type="submit" className="btn">
          send msg
        </button>
      </form>
    </div>
  );
};
