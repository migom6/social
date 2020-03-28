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
CommentSchema.statics.getTotalComments = async function (postId) {

  const getTotal = this.countDocuments({ post: postId });


  try {
    await this.model('Post').findByIdAndUpdate(postId, {
      totalComments: getTotal
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getTotalCommrnts after save
CommentSchema.post('save', function () {
  this.constructor.getTotalComments(this.post);
});

// Call getTotalComments before remove
CommentSchema.pre('remove', function () {
  this.constructor.getTotalComments(this.post);
});

module.exports = mongoose.model('Comment', CommentSchema);
