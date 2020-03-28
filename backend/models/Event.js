const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [500, 'title can not be more than 5000 characters']
    },

    text: {
      type: String,
      maxlength: [5000, 'content can not be more than 5000 characters']
    },

    eventDate: Date,

    photo: {
      type: String,
      default: 'no-photo.jpg'
    },

    going: Number, 
  
  }
);

// Adding event's creater to EventUser collection
// EventSchema.statics.addEventUser = async function(userId,eventId) {
//   console.log(`Adding event's creater to EventUser collection`);
//   await this.model(EventSchema).create({
//     user: userId,
//     event: eventId
//   });
// };

// delete all entries in  EventUser with this event
EventSchema.pre('remove', async function(next) {
  console.log(`EventUser being removed from event ${this._id}`);
  await this.model('EventUser').deleteMany({ event: this._id });
});

module.exports = mongoose.model('Event', EventSchema);
