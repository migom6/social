const express = require('express');
const {

    vote,
    // getUsers,
    getPolls

} = require('../controllers/polls');

const Poll = require('../models/Poll');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(advancedResults(Poll), getPolls);

router
    .route('/:pollId')
    .post(vote);

// router
//     .route('/:pollId/users')
//     .get(getUsers);

module.exports = router;
