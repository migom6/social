import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Divider,
  Flex,
  Text,
  Avatar,
  IconButton,
  Button,
  Progress,
} from "@chakra-ui/core";

const Poll = ({
  title,
  totalComments,
  choices,
  user,
  time,
  id,
  totalVotes,
  voted,
}) => {
  const [view, setView] = useState(() => (voted ? "answer" : "vote"));

  const toggleView = (e) => {
    setView((view) => {
      if (view === "vote") {
        setView("answer");
      } else if (view === "answer") {
        setView("vote");
      }
    });
  };

  return (
    <Stack key={id} paddingX="2em" marginTop=".5em" _hover={{ bg: "gray.100" }}>
      <Flex justifyContent="space-between" color="gray.500" fontSize="xs">
        <Flex alignItems="center" w="25%" justifyContent="space-between">
          <Avatar
            size="xs"
            name="Dan Abrahmov"
            src="https://avatars0.githubusercontent.com/u/13897276?s=400&u=7d1b1eca14a49b36aa10d58883152d6f09cc66e7&v=4"
          />
          <Text>{user}</Text>
          <Text>|</Text>
          <Text>{time}</Text>
        </Flex>
        <Flex>
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon="external-link"
            size="xs"
            _focus={{ border: "none" }}
          />
        </Flex>
      </Flex>
      <Link to={`/${id}`}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.700"
          marginBottom="0.5em"
        >
          {title}
        </Text>
      </Link>
      {view === "vote" &&
        choices.map((element, key) => {
          return (
            <Button
              key={key}
              bg="gray.700"
              color="gray.50"
              _hover={{ bg: "gray.200", color: "gray.700" }}
              // _active={{ color: "gray.500" }}
              onClick={toggleView}
            >
              <Text>{element.choice}</Text>
            </Button>
          );
        })}
      {view === "answer" &&
        choices.map((element, key) => {
          const value = Number(element.count) / Number(totalVotes).toFixed(2);
          return (
            <Stack key={key}>
              <Flex
                justifyContent="space-between"
                px="2em"
                color="gray.700"
                fontWeight="500"
              >
                <Text marginRight="0.5em">{element.choice}</Text>
                <Text>{element.count}</Text>
              </Flex>
              <Progress color="green" size="lg" value={value * 100} />
            </Stack>
          );
        })}
      <Flex
        w="100%"
        justifyContent="space-between"
        marginTop="1em"
        color="gray.600"
      >
        <Flex>
          {totalComments}
          <IconButton
            variant="ghost"
            variantColor="grey"
            aria-label="Search database"
            icon="chat"
            size="xs"
            _focus={{ border: "none" }}
          />
        </Flex>
        {view === "answer" && (
          <Flex>
            <IconButton
              variant="ghost"
              variantColor="grey"
              aria-label="Search database"
              icon="edit"
              size="xs"
              _focus={{ border: "none" }}
              onClick={toggleView}
            />
            change vote?
          </Flex>
        )}
      </Flex>
      <Divider />
    </Stack>
  );
};

export default Poll;
