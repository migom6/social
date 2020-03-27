const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single post
// @route     GET /api/v1/posts/:id
// @access    Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

// @desc      Create new post
// @route     POST /api/v1/posts
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc      Update post
// @route     PUT /api/v1/posts/:id
// @access    Private
// exports.updatePost = asyncHandler(async (req, res, next) => {
//   let post = await Post.findById(req.params.id);

//   if (!post) {
//     return next(
//       new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // Make sure user is post owner
//   if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update this post`,
//         401
//       )
//     );
//   }

//   post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   res.status(200).json({ success: true, data: post });
// });

// // @desc      Delete post
// // @route     DELETE /api/v1/posts/:id
// // @access    Private
// exports.deletePost = asyncHandler(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return next(
//       new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // Make sure user is post owner
//   if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to delete this post`,
//         401
//       )
//     );
//   }

//   await post.remove();

//   res.status(200).json({ success: true, data: {} });
// });

// @desc      Get posts within a radius
// @route     GET /api/v1/posts/radius/:zipcode/:distance
// @access    Private

// @desc      Upload photo for post
// @route     PUT /api/v1/posts/:id/photo
// @access    Private
// exports.postPhotoUpload = asyncHandler(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return next(
//       new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // Make sure user is post owner
//   if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update this post`,
//         401
//       )
//     );
//   }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
//   }

//   const file = req.files.file;

//   // Make sure the image is a photo
//   if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400));
//   }

//   // Check filesize
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   // Create custom filename
//   file.name = `photo_${post._id}${path.parse(file.name).ext}`;

//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//     if (err) {
//       console.error(err);
//       return next(new ErrorResponse(`Problem with file upload`, 500));
//     }

//     await Post.findByIdAndUpdate(req.params.id, { photo: file.name });

//     res.status(200).json({
//       success: true,
//       data: file.name
//     });
//   });
// });
