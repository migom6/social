const express = require("express");
const {
  getPosts,
  getPost,
  // createPost,
  //   updatePost,
  //   deletePost,
  //   postPhotoUpload
} = require("../controllers/posts");

const Post = require("../models/Post");

// Include other resource routers
// const commentRouter = require('./comments.js');
const likes = require("./likes");
const dislikes = require("./dislikes");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
// Re-route into other resource routers
// router.use('/:postId/.....', commentRouter);

// router
//   .route('/:id/photo')
//   .put(protect, authorize('publisher', 'admin'), postPhotoUpload);

router.route("/").get(advancedResults(Post, ["comments"]), getPosts);
// .post(protect, authorize("publisher", "user"), createPost);

router.route("/:postId").get(getPost);
//   .put(protect, authorize('publisher', 'admin'), updatePost)
//   .delete(protect, authorize('publisher', 'admin'), deletePost);

router.use("/:postId/likes", likes);
router.use("/:postId/dislikes", dislikes);

module.exports = router;
