const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Feed = require('../models/Feed');
const Post = require('../models/Post');
const Event = require('../models/Event');

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

  if(req.body.kind === 'post'){
    post = await Post.create(req.body);
    feed = await Feed.create({user, post})
  }
  else if(req.body.kind === 'event'){
    event = await Event.create(req.body);
    feed = await Feed.create({user, event})
  }
  else {
    return next(
      new ErrorResponse(
        `Wrong type of feed`,
        401
      )
    );
  }

  
  // console.log(feed);

  res.status(201).json({
    success: true,
    data: feed
  });
});
