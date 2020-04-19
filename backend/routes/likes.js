const express = require("express");
const { like, likes } = require("../controllers/likes");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").post(like);
router.route("/").get(likes);

module.exports = router;
