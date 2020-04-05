const express = require('express');
const {
    dislike,
    dislikes
} = require('../controllers/dislikes');


const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .post(dislike);


module.exports = router;