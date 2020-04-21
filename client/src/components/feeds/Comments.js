import React, { useState } from "react";
import {
  Stack,
  Flex,
  Avatar,
  Text,
  Divider,
  Input,
  Box,
  IconButton,
} from "@chakra-ui/core";

const comments = [
  { text: "Isn't that the Pontiac bandit?!", time: "2hr ago", user: "migom" },
  { text: "Isn't that the Pontiac bandit?!", time: "2hr ago", user: "migom" },
  { text: "Isn't that the Pontiac bandit?!", time: "2hr ago", user: "migom" },
  { text: "Isn't that the Pontiac bandit?!", time: "2hr ago", user: "migom" },
  { text: "Isn't that the Pontiac bandit?!", time: "2hr ago", user: "migom" },
];

const Comments = () => {
  const [value, setValue] = useState("");

  return (
    <Stack paddingX="2em" marginTop=".5em">
      <Input
        alignSelf="center"
        w="100%"
        borderRadius={"15px"}
        marginTop="1em"
        variant="outline"
        borderColor="gray.400"
        borderWidth="1px"
        color="white"
        size="sm"
        name="comment"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={"Enter a comment"}
        autoComplete="off"
        _hover={{ color: "gray.700" }}
      />
      <Divider marginTop="1em" />
      {comments.map((element, id) => {
        return (
          <>
            <Flex key={id} w="100%">
              <Avatar
                marginRight="1em"
                size="sm"
                name="Dan Abrahmov"
                src="https://avatars0.githubusercontent.com/u/13897276?s=400&u=7d1b1eca14a49b36aa10d58883152d6f09cc66e7&v=4"
              />
              <Stack flexGrow="1">
                <Text color="gray.500" fontSize="xs">
                  {element.user}
                </Text>
                <Text>{element.text}</Text>
              </Stack>
              <Text color="gray.500" fontSize="xs">
                {element.time}
              </Text>
              <IconButton
                color="red.500"
                variantColor="grey"
                variant="ghost"
                aria-label="Search database"
                icon="small-close"
                size="xs"
                marginTop="0px"
                _focus={{ border: "none" }}
              />
            </Flex>
            <Divider />
          </>
        );
      })}
      <Box height="100px"></Box>
    </Stack>
  );
};

export default Comments;
