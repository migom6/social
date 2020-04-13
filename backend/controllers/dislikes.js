const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

// @desc      Like an post or Going to an event
// @route     GET /api/v1/comments
// @route     GET /api/v1/feeds/:feedId/likes/
// @access    Public
exports.dislike = asyncHandler(async (req, res, next) => {
  const post = await Post.find({ post: req.params.postId });

  if (!post) {
    return next(
      new ErrorResponse(`No post is found ${req.params.postId}`),
      404
    );
  }

  let like = await Like.findOne({ post: req.params.postId, user: req.user.id });
  let dislike = await Dislike.findOne({
    post: req.params.postId,
    user: req.user.id,
  });

  if (like) {
    await like.remove();
  }

  if (dislike) {
    await dislike.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  }

  dislike = await Dislike.create({
    user: req.user.id,
    post: req.params.postId,
  });
  return res.status(200).json({
    success: true,
    data: dislike,
  });
});

exports.dislikes = asyncHandler(async (req, res, next) => {
  let DISlikes = await dislike.find({ post: req.params.id });

  res.status(200).json({
    success: true,
    data: dislikes,
  });
});
