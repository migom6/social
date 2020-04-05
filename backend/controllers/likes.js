const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Feed = require('../models/Feed');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');

// @desc      Like an post or Going to an event
// @route     GET /api/v1/comments
// @route     GET /api/v1/feeds/:postId/likes/
// @access    Public
exports.like = asyncHandler(async (req, res, next) => {

    const post = await Post.find({post: req.params.postId});

    if(!post) {
      return next(new ErrorResponse(`No post is found ${req.params.postId}`), 404);
    }
    
    let like = await Like.findOne({ post: req.params.postId, user:  req.user.id });
    let dislike = await Dislike.findOne({  post: req.params.postId, user:  req.user.id  });

    if(dislike) {
        await dislike.remove();
    }

    if(like) {
        await like.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    }

    like = await Like.create({user,post});
    return res.status(200).json({
        success: true,
        data: like
    });

});

exports.likes = asyncHandler(async (req, res, next) => {

    let likes = await Like.find({post: req.params.id});
    
    res.status(200).json({
        success: true,
        data: likes
    });
});
