import React from "react";
import { List, ListItem, Text, PseudoBox, Avatar } from "@chakra-ui/core";

const listStyle = {
  display: "flex",
  flexDirection: "column-reverse",
  height: "100%",
  overflow: "hidden",
};

const Messages = ({ messages, room }) => {
  return (
    <PseudoBox
      as={List}
      {...listStyle}
      _hover={{ overflowY: "scroll", "::-webkit-scrollbar": { width: "0" } }}
    >
      {messages
        .filter((message) => message.room === room)
        .map((message, index) => (
          <ListItem
            display="grid"
            gridTemplateColumns="25% auto 20%"
            gridTemplateRows="30% 25% 25%"
            gridTemplateAreas={
              '"logo msg time" "logo msg time" "sender msg time"'
            }
            key={index}
            bg="blue.900"
            borderRadius="0.5em"
            px="0.8em"
            py="0.8em"
            marginBottom={"1em"}
          >
            <Avatar
              gridArea="logo"
              src="https://avatars0.githubusercontent.com/u/13897276?s=400&u=7d1b1eca14a49b36aa10d58883152d6f09cc66e7&v=4"
              size="xs"
            ></Avatar>
            <Text gridArea="sender" fontSize={"xs"} color={"gray.500"}>
              {message.from}
            </Text>
            <Text gridArea="msg" fontSize="md" color={"gray.50"}>
              {message.text}
            </Text>
            <Text gridArea="time" fontSize={"xs"} color={"gray.500"}>
              {message.createdDate}
            </Text>
          </ListItem>
        ))}
    </PseudoBox>
  );
};

export default Messages;
