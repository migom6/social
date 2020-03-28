const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
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

    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Posts',
      required: true
    }
  }
);

LikeSchema.index({ post: 1, user: 1 }, { unique: true });

CommentSchema.statics.getTotalLikes = async function (postId) {

  const getTotal = this.countDocuments({ post: postId });


  try {
    await this.model('Post').findByIdAndUpdate(postId, {
      totalLikes: getTotal
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getTotalLikes after save
LikeSchema.post('save', function () {
  this.constructor.getAverageLikes(this.post);
});

// Call getTotalLikes before remove
LikeSchema.pre('remove', function () {
  this.constructor.getAveragLikes(this.post);
});

module.exports = mongoose.model('Likes', LikeSchema);