const express = require("express");
const { dislike, dislikes } = require("../controllers/dislikes");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").post(dislike);
router.route("/").get(dislikes);

module.exports = router;
