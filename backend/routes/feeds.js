const express = require('express');
const {
  getFeeds,
  getFeed,
  addFeed,
  updateFeed,
  deleteFeed
} = require('../controllers/feeds');

const Feed = require('../models/Feed');

const router = express.Router({ mergeParams: true });

// Include other resource routers
const commentRouter = require('./comments');


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:feedId/comments/', commentRouter);

router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Feed,
      ["comments", "post-content", "event-content", "poll-content"]),
    getFeeds
  )
  .post(addFeed);

router
  .route('/:feedId')
  .get(authorize('admin', 'user'), getFeed)
  //.put(protect, authorize('admin', 'user'), updateFeed)
  .delete(protect, authorize('admin', 'user'), deleteFeed);

module.exports = router;
