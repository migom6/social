const mongoose = require('mongoose');

const DislikeSchema = new mongoose.Schema(
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


DislikeSchema.index({ post: 1, user: 1 }, { unique: true });

DislikeSchema.statics.getTotalDislikes = async function(postId) {
  
  this.countDocuments( {post: postId}, async (err, count) => {

    if(err) {
      console.log(err);
    }

    try {
      await this.model('Post').findByIdAndUpdate(postId, {
        totalDislikes: count
      });
    } catch (err) {
      console.error(err);
    }

  });

};

// Call getTotalDislikes after save
DislikeSchema.post('save', function() {
  this.constructor.getTotalDislikes(this.post);
});

// Call getTotalDislikes before remove
DislikeSchema.post('remove', function() {
  this.constructor.getTotalDislikes(this.post);
});


module.exports = mongoose.model('Dislike', DislikeSchema);