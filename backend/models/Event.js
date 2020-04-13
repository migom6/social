const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [500, "title can not be more than 5000 characters"],
    required: true,
  },

  text: {
    type: String,
    maxlength: [5000, "content can not be more than 5000 characters"],
  },

  eventDate: Date,

  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  going: {
    type: Number,
  },
});

// delete all entries in  EventUser with this event
EventSchema.post("remove", async function (next) {
  console.log(`EventUser being removed from event ${this._id}`);
  await this.model("EventUser").deleteMany({ event: this._id });
});

module.exports = mongoose.model("Event", EventSchema);
