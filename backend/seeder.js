const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const asyncHandler = require("./middleware/async");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const User = require("./models/User");
const Feed = require("./models/Feed");
const Comment = require("./models/Comment");
const Post = require("./models/Post");
const Poll = require("./models/Poll");
const Event = require("./models/Event");
const EventUser = require("./models/EventUser");
const PollUser = require("./models/Post");
const Like = require("./models/Like");
const Dislike = require("./models/Dislike");

// Connect to DB
var con = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connect(process.env.MONGO_URI, function () {
  /* Drop the DB */
  mongoose.connection.db.dropDatabase();
});

// Read JSON files
const usersFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const postsFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, "utf-8")
);
const eventsFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/events.json`, "utf-8")
);
const pollsFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/polls.json`, "utf-8")
);
const commentsFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/comments.json`, "utf-8")
);

console.log(postsFile[0]);

// local store the variables

const users = [];
const feeds = [];
const comments = [];

const createDb = asyncHandler(async () => {
  // Create Users and store them in users array
  await Promise.all(
    usersFile.map(async (user_data, index) => {
      user = await User.create(user_data);
      users.push(user);
    })
  );

  // get one user
  let userId = users[0]._id;

  //create the feeds

  await Promise.all(
    postsFile.map(async (post_data) => {
      // first making the post then create the feed
      post = await Post.create(post_data);
      feed = await Feed.create({ user: userId, post, kind: "post" });
      feeds.push(feed);
    })
  );

  await Promise.all(
    eventsFile.map(async (event_data) => {
      event = await Event.create(event_data);
      feed = await Feed.create({ user: userId, event, kind: "event" });
      feeds.push(feed);
    })
  );

  await Promise.all(
    pollsFile.map(async (poll_data) => {
      poll = await Poll.create(poll_data);
      feed = await Feed.create({ user: userId, poll, kind: "poll" });
      feeds.push(feed);
    })
  );

  feeds.slice(0, 2).map(async (feed) => {
    await Promise.all(
      commentsFile.map(async (comment_data, index) => {
        comment = await Comment.create({
          text: comment_data.text,
          feed: feed._id, //getting the first feed
          user: users[index + 1]._id,
        });
      })
    );
  });
});

createDb();
