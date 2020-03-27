const express = require('express');
const {
  getFeeds,
  // getFeed,
  addFeed,
  // updateFeed,
  // deleteFeed
} = require('../controllers/feeds');

const Feed = require('../models/Feed');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Feed,
    ["comments"]),
    getFeeds
  )
  .post(protect, authorize('user'), addFeed);

// router
//   .route('/:id')
//   .get(getFeed)
  // .put(protect, authorize('publisher', 'user'), updateFeed)
  // .delete(protect, authorize('publisher', 'user'), deleteFeed);

module.exports = router;
