const express = require('express');
const {
  getFeeds,
  getFeed,
  addFeed,
  updateFeed,
  deleteFeed
} = require('../controllers/feeds');

const Feed = require('../models/Feed');

// Include other resource routers
const commentRouter = require('./comments');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:feedId/comments', commentRouter);


router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Feed,
      ["comments", "post-content", "event-content"]),
    getFeeds
  )
  .post(addFeed);

router
  .route('/:feedId')
  .get(getFeed)
  .put(updateFeed)
  .delete(deleteFeed);

module.exports = router;
