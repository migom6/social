import React from "react";

const Messages = ({ messages, room }) => {
  return (
    <ul id="messages">
      {messages
        .filter((message) => message.room === room)
        .map((message, index) => (
          <li key={index}>
            <div>
              <div className="msg">
                <h4>{message.from}</h4>
                <div className="msg-body">
                  <p>{message.text}</p>
                </div>
                <span className="msg-date">{message.createdDate}</span>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Messages;
