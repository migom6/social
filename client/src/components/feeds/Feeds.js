import React from "react";
import Post from "./Post";
import Poll from "./Poll";

function Feeds() {
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
  return (
    <>
      {arr.map((element, index) => {
        const { kind } = element;
        if (kind === "post") {
          return (
            <Post
              id={index}
              title={element.title}
              image={element.image}
              user={element.user}
              totalComments={element.totalComments}
              totalLikes={element.totalLikes}
              totalDislikes={element.totalDislikes}
              time={element.time}
            />
          );
        } else if (kind === "poll") {
          return (
            <Poll
              id={index}
              title={element.title}
              user={element.user}
              totalComments={element.totalComments}
              time={element.time}
              choices={element.choices}
              totalVotes={element.totalVotes}
              voted={element.voted}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default Feeds;
