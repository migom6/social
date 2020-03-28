const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: [true, 'Please add some text'],
    maxlength: [5000]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  feed: {
    type: mongoose.Schema.ObjectId,
    ref: 'Feed',
    required: true
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }

});


// Static method to get total comments and save
CommentSchema.statics.getTotalComments = async function (feed) {

  this.countDocuments({ feed }, async (err, count) => {

    if (err) {
      console.log(err);
    }

    try {
      await this.model('Feed').findByIdAndUpdate(feed, {
        totalComments: count
      });
    } catch (err) {
      console.error(err);
    }

  })

};

// Call getTotalComments after save
CommentSchema.post('save', function () {
  this.constructor.getTotalComments(this.feed);
});

// Call getTotalComments before remove
CommentSchema.post('remove', function () {
  this.constructor.getTotalComments(this.feed);
});

module.exports = mongoose.model('Comment', CommentSchema);
