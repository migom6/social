const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Feed = require('../models/Feed');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Comment = require('../models/Comment');


// @desc      Get comments
// @route     GET /api/v1/comments
// @route     GET /api/v1/posts/:postId/comments
// @access    Public
exports.getFeeds = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);

});

// @desc      Get single feed
// @route     GET /api/v1/feeds/:id
// @access    Public
exports.getFeed = asyncHandler(async (req, res, next) => {
  //const feed = await Feed.findById(req.params.id);

  Feed.findOne({ _id: req.params.id }).populate('post').
  exec(function (err, feed) {
    if (err) return next(
          new ErrorResponse(`Feed not found with id of ${req.params.id}`, 404)
        );
    console.log('The post is %s', feed);
    res.status(200).json({ success: true, data: feed});
    
  });

});

// @desc      Create new feed
// @route     POST /api/v1/feeds
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
