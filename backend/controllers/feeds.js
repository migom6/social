const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Feed = require("../models/Feed");
const Post = require("../models/Post");
const Event = require("../models/Event");
const EventUser = require("../models/EventUser");
const Poll = require("../models/Poll");

// @desc      Get comments
// @route     GET /api/v1/comments
// @route     GET /api/v1/feeds
// @access    Public
exports.getFeeds = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single feed
// @route     GET /api/v1/feeds/:feedId
// @access    Public
exports.getFeed = asyncHandler(async (req, res, next) => {
  let feed = await Feed.findById(req.params.feedId);
  if (feed.kind === "post") {
    Feed.findOne({ _id: req.params.feedId })
      .populate("post")
      .exec(function (err, feed) {
        if (err)
          return next(
            new ErrorResponse(
              `Feed not found with id of ${req.params.feedId}`,
              404
            )
          );
        console.log("The Post is %s", feed);
        res.status(200).json({ success: true, data: feed });
      });
  } else if (feed.kind === "event") {
    Feed.findOne({ _id: req.params.feedId })
      .populate("event")
      .exec(function (err, feed) {
        if (err)
          return next(
            new ErrorResponse(
              `Feed not found with id of ${req.params.feedId}`,
              404
            )
          );
        console.log("The Event is %s", feed);
        res.status(200).json({ success: true, data: feed });
      });
  } else if (feed.kind === "poll") {
    Feed.findOne({ _id: req.params.feedId })
      .populate("poll")
      .exec(function (err, feed) {
        if (err)
          return next(
            new ErrorResponse(
              `Feed not found with id of ${req.params.feedId}`,
              404
            )
          );
        console.log("The Poll is %s", feed);
        res.status(200).json({ success: true, data: feed });
      });
  }
});

// @desc      Create new feed
// @route     POST /api/v1/feeds
// @access    Private
exports.addFeed = asyncHandler(async (req, res, next) => {
  let feed;
  const user = req.user.id;

  if (req.body.kind === "post") {
    post = await Post.create(req.body);
    feed = await Feed.create({ user, post, kind: req.body.kind });
    return res.status(201).json({
      success: true,
      data: feed,
    });
  } else if (req.body.kind === "event") {
    event = await Event.create(req.body);
    feed = await Feed.create({ user, event, kind: req.body.kind });
    await EventUser.create({ user, event });
    return res.status(201).json({
      success: true,
      data: feed,
    });
  } else if (req.body.kind === "poll") {
    if (new Set(req.body.choices).size !== req.body.choices.length) {
      return next(new ErrorResponse("Give unique choices", 400));
    }

    req.body.choices.map((choice, index) => {
      req.body.choices[index] = {
        choice: choice,
        count: 0,
      };
    });

    let poll = await Poll.create(req.body);
    feed = await Feed.create({ user, poll, kind: req.body.kind });

    return res.status(201).json({
      success: true,
      data: poll,
    });
  } else {
    return next(new ErrorResponse(`Wrong type of feed`, 401));
  }
});

// // @desc      Delete post
// @route     DELETE /api/v1/feeds/:id
// @access    Private
exports.deleteFeed = asyncHandler(async (req, res, next) => {
  const feed = await Feed.findById(req.params.feedId);
  if (!feed) {
    return next(
      new ErrorResponse(`Feed not found with id of ${req.params.feedId}`, 404)
    );
  }

  // Make sure user is Feed owner
  if (feed.user.toString() !== req.user.id && req.user.role !== "user") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this feed`,
        401
      )
    );
  }

  await feed.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Update Feed - take JSON according to Post Schema
// @route     PUT /api/v1/feeds/:feedId
// @access    Private
// exports.updateFeed = asyncHandler(async (req, res, next) => {
//   let feed = await Feed.findById(req.params.feedId);
//   console.log(feed);
//   if (!feed) {
//     return next(
//       new ErrorResponse(`Feed not found with id of ${req.params.feedId}`, 404)
//     );
//   }

//   // Make sure user is post owner
//   if (feed.user.toString() !== req.user.id && req.user.role !== 'user') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update this post`,
//         401
//       )
//     );
//   }

//   if(feed.kind === 'post'){

//     let post = await Post.findById(feed.post);

//     if (!post) {
//       return next(
//         new ErrorResponse(`Post not found with id of ${feed.event}`, 404)
//       );
//     }

//     post = await Post.findByIdAndUpdate(feed.post, req.body, {
//       new: true,
//       runValidators: true
//     });

//     res.status(200).json({ success: true, data: post });

//   }

//   if(feed.kind === 'event'){

//     let event = await Event.findById(feed.event);

//     if (!event) {
//       return next(
//         new ErrorResponse(`Event not found with id of ${feed.event}`, 404)
//       );
//     }

//     event = await Event.findByIdAndUpdate(feed.event, req.body, {
//       new: true,
//       runValidators: true
//     });

//     res.status(200).json({ success: true, data: event });

//   }

// });
