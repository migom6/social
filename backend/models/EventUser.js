const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true
    },

    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
      },
    
  }
);


module.exports = mongoose.model('EventUser', EventSchema);
