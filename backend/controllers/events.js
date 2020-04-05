const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Event = require('../models/Event');

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Public
exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.eventId);
    
    if(!event) {
        return next(
            new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
          );
    }
    res.status(200).json({ success: true, data: event });

  });


