const path = require("path");
const ErrorRespose = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Poll = require("../models/Poll");
const PollUser = require("../models/PollUser");

// @desc      voting
// @route     GET /api/v1/pollId/
// @access    Public

exports.vote = asyncHandler(async (req, res, next) => {
  let poll = Poll.findById(req.params.pollId);

  if (!poll) {
    return next(
      new ErrorRespose(`Poll is not found with pollId ${req.params.pollId}`)
    );
  }

  const pollUser = await PollUser.findOne({
    user: req.user.id,
    poll: req.params.pollId,
  });
  if (pollUser) {
    oldChoice = pollUser.choice;
    const query = {
      _id: req.params.pollId,
      "choices.choice": oldChoice,
    };

    await Poll.findOneAndUpdate(query, { $inc: { "choices.$.count": -1 } });
    await pollUser.remove();

    if (oldChoice === req.body.choice) {
      return res.status(200).json({
        success: true,
        data: {},
      });
    }
  }

  const vote = await PollUser.create({
    poll: req.params.pollId,
    user: req.user.id,
    choice: req.body.choice,
  });

  const query = {
    _id: req.params.pollId,
    "choices.choice": req.body.choice,
  };

  await Poll.findOneAndUpdate(query, { $inc: { "choices.$.count": 1 } });

  res.status(200).json({
    success: true,
    data: vote,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await PollUser.find({ poll: req.params.pollId });

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getPolls = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPollbyId = asyncHandler(async (req, res, next) => {
  const poll = await Poll.findById(req.params.pollId);

  if (!poll) {
    return next(
      new ErrorResponse(`Poll not found with id of ${req.params.pollId}`, 404)
    );
  }

  res.status(200).json({ success: true, data: poll });
});
