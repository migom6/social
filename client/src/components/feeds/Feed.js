import React from "react";
import Post from "./Post";
import Poll from "./Poll";
import Comments from "./Comments";
import { useParams, Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/core";
function Feed() {
  const { id } = useParams();

  const element = arr[Number(id)];

  const renderFeed = (element) => {
    if (element.kind === "post") {
      return (
        <Post
          id={id}
          title={element.title}
          image={element.image}
          user={element.user}
          totalComments={element.totalComments}
          totalLikes={element.totalLikes}
          totalDislikes={element.totalDislikes}
          time={element.time}
        />
      );
    } else if (element.kind === "poll") {
      return (
        <Poll
          id={id}
          title={element.title}
          user={element.user}
          totalComments={element.totalComments}
          time={element.time}
          choices={element.choices}
          totalVotes={element.totalVotes}
          voted={element.voted}
        />
      );
    } else return null;
  };

  return (
    <>
      <Link to="/">
        <IconButton
          color="gray.500"
          marginLeft="1.5em"
          marginTop="1.5em"
          variantColor="grey"
          variant="solid"
          size="sm"
          aria-label="Search database"
          icon="arrow-back"
          _focus={{ border: "none" }}
        />
        {renderFeed(element)}
      </Link>

      <Comments />
    </>
  );
}

export default Feed;

var arr = [
  {
    kind: "post",
    title: "You know what really grind my gear?",
    image: "https://img-9gag-fun.9cache.com/photo/aZ79y6X_700bwp.webp",
    user: "migom",
    totalComments: 34,
    totalDislikes: 12,
    totalLikes: 15,
    time: "1hr",
  },
  {
    kind: "poll",
    title: "Rate me?",
    user: "migom",
    time: "3hr",
    totalComments: 7,
    totalVotes: 12,
    voted: false,
    choices: [
      { choice: "Thomas", count: "8" },
      { choice: "Angie", count: "5" },
      { choice: "Ben", count: "4" },
      { choice: "Larson", count: "6" },
      { choice: "Junior", count: "2" },
    ],
  },
  {
    kind: "post",
    title: "You know what really grind my gear?",
    image: "https://img-9gag-fun.9cache.com/photo/a7w4Enw_700bwp.webp",
    user: "migom",
    totalComments: 34,
    totalDislikes: 12,
    totalLikes: 15,
    time: "32m",
  },
];
