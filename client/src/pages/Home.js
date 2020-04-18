import React from "react";
import Feed from "../components/Feed";
import { ChatBox } from "../components/chat/ChatBox";

// import { Button, Menu, Dropdown } from "antd";
// import { DownOutlined } from "@ant-design/icons";

// function handleMenuClick(e) {
//   console.log("click", e);
// }

// const menu = (
//   <Menu onClick={handleMenuClick}>
//     <Menu.Item key="1">1st item</Menu.Item>
//     <Menu.Item key="2">2nd item</Menu.Item>
//     <Menu.Item key="3">3rd item</Menu.Item>
//   </Menu>
// );

// const Add = () => (
//   <div>
//     <Button type="primary">primary</Button>
//     <Button>secondary</Button>
//     <Dropdown overlay={menu}>
//       <Button>
//         Actions <DownOutlined />
//       </Button>
//     </Dropdown>
//   </div>
// );

const Home = () => {
  return (
    <div id="main">
      <div id="left">
        <div id="extras">extra</div>
      </div>
      <div id="nav">
        <span id="logo">Social</span>
        <button id="add-feed">add post</button>
        {/* <Add /> */}
      </div>

      <div id="feeds">
        <Feed />
      </div>
      <div id="right">
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
