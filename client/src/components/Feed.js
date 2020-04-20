import React from "react";

import {
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const Post = ({
  title,
  image,
  totalComments,
  totalLikes,
  totalDislikes,
  user,
  time,
}) => {
  return (
    <div className="feed">
      <div className="feed-user">
        {user} | {time}
      </div>
      <div className="feed-title">{title}</div>
      {image ? <img className="feed-img" src={image} /> : null}
      <div className="feed-meta">
        <span>
          {totalLikes} <LikeOutlined />
        </span>
        <span>
          {totalDislikes} <DislikeOutlined />
        </span>
        <span>
          {totalComments} <CommentOutlined />
        </span>
      </div>

      <div></div>
    </div>
  );
};

function Feed() {
  var arr = [
    {
      title: "You know what really grind my gear?",
      image: "https://img-9gag-fun.9cache.com/photo/a7w4Enw_700bwp.webp",
      user: "migom",
      totalComments: 34,
      totalDislikes: 12,
      totalLikes: 15,
      time: "1hr",
    },
    {
      title: "You know what really grind my gear?",
      image: "",
      user: "migom",
      totalComments: 34,
      totalDislikes: 12,
      totalLikes: 15,
      time: "32m",
    },
    {
      title: "You know what really grind my gear?",
      image: "https://img-9gag-fun.9cache.com/photo/aXjDjQV_460swp.webp",
      user: "migom",
      totalComments: 34,
      totalDislikes: 12,
      totalLikes: 15,
      time: "3hr",
    },
  ];
  return (
    <>
      {arr.map((element, key) => (
        <Post
          title={element.title}
          image={element.image}
          user={element.user}
          totalComments={element.totalComments}
          totalLikes={element.totalLikes}
          totalDislikes={element.totalDislikes}
          time={element.time}
        />
      ))}
    </>
  );
}

export default Feed;
