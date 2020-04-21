import React from "react";

import {
  Stack,
  Divider,
  Flex,
  Text,
  Avatar,
  IconButton,
  Image,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

const Post = ({
  id,
  title,
  image,
  totalComments,
  totalLikes,
  totalDislikes,
  user,
  time,
}) => {
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
        <Text fontSize="lg" fontWeight="bold" color="gray.700">
          {title}
        </Text>
      </Link>
      {image ? (
        <Image
          alignSelf="center"
          w="400px"
          objectFit="cover"
          src={image}
          alt="Segun Adebayo"
          marginTop="1em"
        />
      ) : null}
      <Flex
        w="25%"
        justifyContent="space-between"
        marginTop="1em"
        color="gray.600"
      >
        <Flex>
          {totalLikes}
          <IconButton
            color="green.500"
            variantColor="grey"
            variant="ghost"
            aria-label="Search database"
            icon="triangle-up"
            size="xs"
            _focus={{ border: "none" }}
          />
        </Flex>
        <Flex>
          {totalDislikes}
          <IconButton
            color="red.500"
            variant="ghost"
            variantColor="grey"
            aria-label="Search database"
            icon="triangle-down"
            size="xs"
            _focus={{ border: "none" }}
          />
        </Flex>
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
      </Flex>
      <Divider />
    </Stack>
  );
};

export default Post;
