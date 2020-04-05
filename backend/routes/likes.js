const express = require('express');
const {
    like,
    likes
} = require('../controllers/likes');

const Like = require('../models/Like');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .post(like);



module.exports = router;