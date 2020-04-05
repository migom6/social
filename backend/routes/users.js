const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');
const {eventsByUser} = require('../controllers/eventUsers');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
//router.use(authorize('admin'));

router
  .route('/')
  .get(authorize('admin'), advancedResults(User, []), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(authorize('admin'), getUser)
  //.put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

router
  .route('/events', eventsByUser);

module.exports = router;
