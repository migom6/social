express = require("express");
const {
  getComments,
  addComment,
  // updateComment,
  deleteComment,
  getComment,
} = require("../controllers/comments");

const Comment = require("../models/Comment");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router.use(protect);

router
  .route("/")
  .get(advancedResults(Comment, []), getComments)
  .post(addComment);

router
  .route("/:commentId")
  .get(getComment)
  //.put(updateComment)
  .delete(deleteComment);

module.exports = router;
