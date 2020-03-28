const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Feed = require('../models/Feed');
const Post = require('../models/Post');
const Event = require('../models/Event');
// const Comment = require('../models/Comment');


// @desc      Get comments
// @route     GET /api/v1/comments
// @route     GET /api/v1/posts/:postId/comments
// @access    Public
exports.getFeeds = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);

});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.addFeed = asyncHandler(async (req, res, next) => {

  let feed;
  const user = req.user.id;

  if (req.body.kind === 'post') {
    post = await Post.create(req.body);
    feed = await Feed.create({ user, post })
  }
  else if (req.body.kind === 'event') {
    event = await Event.create(req.body);
    feed = await Feed.create({ user, event })
  }
  else {
    return next(
      new ErrorResponse(
        `Wrong type of feed`,
        401
      )
    );
  }

  res.status(201).json({
    success: true,
    data: feed
  });
});

exports.getFeed = asyncHandler(async (req, res, next) => {

  const feed = await Feed.findById(req.params.feedId)
  if (!feed) {
    return next(new ErrorResponse(`Feed with id ${req.params.feedId} not found`), 404);
  }

  return res.status(200).json({
    success: true,
    data: feed
  });

});

exports.updateFeed = asyncHandler(async (req, res, next) => {

  let feed = await Feed.findById(req.params.feedId);

  if (!feed) {
    return next(
      new ErrorResponse(`Feed not found with id of ${req.params.feedId}`, 404)
    );
  }

  // Make sure user is post owner
  if (feed.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this feed`,
        401
      )
    );
  }

  if (req.body.kind === "post") {
    req.body.kind = undefined;
    await Post.findByIdAndUpdate(feed.post, req.body, {
      new: true,
      runValidators: true
    });
  }
  else if (req.body.kind === "event") {
    req.body.kind = undefined;
    await Event.findByIdAndUpdate(feed.event, req.body, {
      new: true,
      runValidators: true
    });
  }
  else {
    return next(new ErrorResponse("Wrong kind of feed in body"), 400);
  }

  return res.status(200).json({ success: true, data: feed });

})


// @desc      Delete post
// @route     DELETE /api/v1/posts/:id
// @access    Private
exports.deleteFeed = asyncHandler(async (req, res, next) => {
  const feed = await Feed.findById(req.params.feedId);

  if (!feed) {
    return next(
      new ErrorResponse(`Feed not found with id of ${req.params.feedId}`, 404)
    );
  }

  // Make sure user is post owner
  if (feed.user.toString() !== req.user.id && req.user.role !== 'admin') {
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
