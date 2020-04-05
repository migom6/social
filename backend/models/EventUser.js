const mongoose = require('mongoose');

const EventUserSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },

    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
      },
    
  }
);

EventUserSchema.index({ event: 1, user: 1 }, { unique: true });

// Static method to get total comments and save
EventUserSchema.statics.getGoing = async function (event) {


  this.countDocuments({ event }, async (err, count) => {
    console.log(count);

    if (err) {
      console.log(err);
    }

    try {
      await this.model('Event').findByIdAndUpdate(event, {
        going: count
      });
    } catch (err) {
      console.error(err);
    }

  })

};

// Call getTotalComments after save
EventUserSchema.post('save', function () {
  this.constructor.getGoing(this.event);
});

// Call getTotalComments before remove
EventUserSchema.post('remove', function () {
  this.constructor.getGoing(this.event);
});




module.exports = mongoose.model('EventUser', EventUserSchema);
