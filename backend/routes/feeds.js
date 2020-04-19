const express = require("express");
const {
  getFeeds,
  getFeed,
  addFeed,
  // updateFeed,
  deleteFeed,
} = require("../controllers/feeds");

const Feed = require("../models/Feed");

const router = express.Router({ mergeParams: true });

// Include other resource routers
const commentRouter = require("./comments");

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");
router.use(protect);

// Re-route into other resource routers
router.use("/:feedId/comments/", commentRouter);

router
  .route("/")
  .get(
    advancedResults(Feed, [
      "comments",
      "post-content",
      "event-content",
      "poll-content",
    ]),
    getFeeds
  )
  .post(addFeed);

router
  .route("/:feedId")
  .get(getFeed)
  //.put(protect, authorize('admin', 'user'), updateFeed)
  .delete(deleteFeed);

module.exports = router;
