import React from "react";
import { List, ListItem, Text, PseudoBox, Avatar } from "@chakra-ui/core";

const listStyle = {
  display: "flex",
  flexDirection: "column-reverse",
  height: "100%",
  overflow: "hidden",
  // "::-webkit-scrollbar": { width: 0 },
};

const messageStyle = {};

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
              src="https://bit.ly/broken-link"
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
