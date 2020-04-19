const express = require("express");
const { getEvents, getEvent } = require("../controllers/events");
const { usersByEvent, going, notGoing } = require("../controllers/eventUsers");

const Event = require("../models/Event");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(advancedResults(Event), getEvents);

router.route("/:eventId").get(getEvent);

router.route("/:eventId/going").post(going);

router.route("/:eventId/notgoing").post(notGoing);

router.route("/:eventId/users").get(usersByEvent);

module.exports = router;
