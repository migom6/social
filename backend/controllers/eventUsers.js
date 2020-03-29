const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EventUser = require('../models/EventUser');
const Feed = require('../models/Feed');
const User = require('../models/User');


//@desc        addUser
//@route       GET /api/v1/:feedId/
//@access      user
exports.addUser = asyncHandler(async (req,res, next) => {

    let feed = await Feed.findById(req.params.id);

    event = feed.event;
    user = feed.user;

    eventUser = await EventUser.create({user,event});

    res.status(200).json({eventUser});

});

//@desc        Get all the Users of an Event
//@route       GET /api/v1/:feedId/users
//@access      user
exports.getUsers = asyncHandler(async (req, res, next) => {

    let feed = await Feed.findById(req.params.id);

    let users = await EventUser.find({event: feed.event}).populate('user');
    
    res.status(200).json(users);
})

//@desc        Get all Events of an User
//@route       GET /api/v1/:feedId/events
//@access      user
exports.getEvents = asyncHandler(async (req, res, next) => {

    let feed = await Feed.findById(req.params.id);
    console.log(req.params.id);

    let events = await EventUser.find({user: feed.user}).populate('event');
    res.status(200).json(events);
})
