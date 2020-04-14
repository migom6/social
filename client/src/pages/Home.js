import React from "react";
import Feed from "../components/Feed";
import { ChatBox } from "../components/chat/ChatBox";

const Home = () => {
  return (
    <div id="main">
      <div id="nav">
        <span>Social</span>
        <button id="add-feed">add post</button>
      </div>
      <div id="left">
        <div id="extras">extra</div>
      </div>
      <div id="feeds">
        feed
        <Feed />
      </div>
      <div id="right">
        <div id="events">event</div>
        <div id="chats">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
