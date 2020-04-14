import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
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
      setMessages([...messages, newMsg]);

      //   var msgArr = scopeThis.state.messages.filter(
      //     (message) => message.room === this.props.match.params.room
      //   );
      //   if (msgArr.length > 3) {
      //     scopeThis.scrollToBottom();
      //   }
    });

    return () => {
      socket.emit("leave", params);
    };
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
  return (
    <div>
      <Messages messages={messages} room={params.room} />
      <form onSubmit={newMessage}>
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
