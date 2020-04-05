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

LikeSchema.statics.getTotalLikes = async function (postId) {

  this.countDocuments({ post: postId },async (err,count) => {
  
  if (err) {
    console.log(err);
  }

  try {
    await this.model('Post').findByIdAndUpdate(postId, {
      totalLikes: count
    });
  } catch (err) {
    console.error(err);
  }
  });
};

// Call getTotalLikes after save
LikeSchema.post('save', function () {
  this.constructor.getTotalLikes(this.post);
});

// Call getTotalLikes before remove
LikeSchema.post('remove', function () {
  this.constructor.getTotalLikes(this.post);
});

module.exports = mongoose.model('Likes', LikeSchema);