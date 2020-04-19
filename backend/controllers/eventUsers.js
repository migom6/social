const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const EventUser = require("../models/EventUser");
const Event = require("../models/Event");
const User = require("../models/User");

//@desc        addUser
//@route       GET /api/v1/:eventId/eventusers
//@access      user
exports.going = asyncHandler(async (req, res, next) => {
  let event = Event.findOne({ event: req.params.eventId });

  if (!event) {
    return next(
      new ErrorResponse(`Event is not found with id ${req.params.eventId}`)
    );
  }

  event = req.params.eventId;
  user = req.user.id;

  let eventUser = await EventUser.create({ user, event });

  res.status(200).json({
    success: true,
    data: eventUser,
  });
});

exports.notGoing = asyncHandler(async (req, res, next) => {
  let event = Event.findOne({ event: req.params.eventId });

  if (!event) {
    return next(
      new ErrorResponse(`Event is not found with id ${req.params.eventId}`)
    );
  }

  // add logic for event creator

  event = req.params.eventId;
  user = req.user.id;

  let eventUser = await EventUser.findOne({ user, event });

  if (!eventUser) {
    return next(
      new ErrorResponse(`Already not going to event ${req.params.eventId}`, 400)
    );
  }

  await eventUser.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc        Get all the Users of an Event
//@route       GET /api/v1/:eventId/eventusers/users
//@access      user
exports.usersByEvent = asyncHandler(async (req, res, next) => {
  let users = await EventUser.find({ event: req.params.eventId }).populate(
    "user"
  );

  res.status(200).json({ success: true, data: users });
});

//@desc        Get all Events of an User
//@route       GET /api/v1/:eventId/eventusers/events
//@access      user
exports.eventsByUser = asyncHandler(async (req, res, next) => {
  let events = await EventUser.find({ user: req.user.id }).populate("event");
  res.status(200).json(events);
});
