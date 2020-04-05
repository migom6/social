const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Feed = require('../models/Feed');
// @desc      Get comments
// @route     GET /api/v1/feedId/comments
// @access    Private
exports.getComments = asyncHandler(async (req, res, next) => {
  if (req.params.feedId) {
    const comments = await Comment.find({ feed: req.params.feedId });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } else {
    return next(new ErrorResponse(`No feedId in params found`, 500));
  }
});

// @desc      Add comment
// @route     POST /api/v1/feedId/comments
// @access    Private
exports.addComment = asyncHandler(async (req, res, next) => {

  if(req.params.feedId) {

    const feed = await Feed.find({feed: req.params.feedId});
    if(!feed) {
      return next(new ErrorResponse(`No feed is found`), 404);
    }

    req.body.feed = req.params.feedId;
    req.body.user = req.user.id;
  
    const comment = await Comment.create(req.body);
    return res.status(200).json({
      success: true,
      data: comment
    });
  }

 
});

// @desc      Update comment
// @route     PUT /api/v1/comments/:id
// @access    Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.commentId}`, 404)
    );
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id && req.user.role !== 'user') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update comment ${comment._id}`,
        401
      )
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc      Delete comment
// @route     DELETE /api/v1/comments/:commentId
// @access    Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.commentId}`, 404)
    );
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id && req.user.role !== 'user') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete comment ${comment._id}`,
        401
      )
    );
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});


// @desc      Get comment
// @route     GET /api/v1/comments/:commentId
// @access    Private
exports.getComment = asyncHandler(async (req, res, next) => {

  const comment = await Comment.findById(req.params.commentId);
  res.status(200).json({
    success: true,
    data: comment
  });

});