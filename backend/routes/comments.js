const express = require('express');
const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/courses');

const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Comment, {
      path: 'post',
      select: 'name text'
    }),
    getComments
  )
  .post(protect, authorize('publisher', 'user'), addComment);

router
  .route('/:id')
  .get(getComment)
  .put(protect, authorize('publisher', 'user'), updateComment)
  .delete(protect, authorize('publisher', 'user'), deleteComment);

module.exports = router;
