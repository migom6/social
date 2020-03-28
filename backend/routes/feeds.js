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

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

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
  .route('/:id')
  .get(authorize('admin', 'user'), getFeed)
  .put(protect, authorize('admin', 'user'), updateFeed)
  .delete(protect, authorize('admin', 'user'), deleteFeed);

module.exports = router;
