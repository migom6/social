const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    
    text: {
      type: String,
      maxlength: [5000, 'content can not be more than 5000 characters'],
      required: true
    },

    photo: {
      type: String,
      default: 'no-photo.jpg'
    },

    totalLikes: {
      type: Number,
      default: 0
    },

    totalDislikes: {
      type: Number,
      default: 0
    },

    totalComments: {
      type: Number,
      default: 0
    },
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

PostSchema.virtual('dislikes', {
  ref: 'Dislike',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

PostSchema.pre('remove', async function(next) {

  console.log(`Likes being removed from post ${this._id}`);
  await this.model('Like').deleteMany({ post: this._id });

  console.log(`Dislikes being removed from post ${this._id}`);
  await this.model('Dislike').deleteMany({ post: this._id });

  next();
});

module.exports = mongoose.model('Post', PostSchema);
