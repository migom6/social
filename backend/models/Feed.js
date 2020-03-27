const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema(
  {
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    kind: {
        type: String,
        enum: ['post', 'event']
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      default: null
      
    },

    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      default: null
      
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
  },

    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }

);



// Cascade delete feeds when a feed is deleted
FeedSchema.pre('remove', async function(next) {

  console.log(`Comments being removed from feed ${this._id}`);
  await this.model('Comment').deleteMany({ feed: this._id });

  if(this.type === 'post') {

    console.log(`Posts being removed from feed ${this._id}`);
    await this.model('Post').deleteMany({ feed: this._id });

  }

  if(this.type === 'event') {

    console.log(`Events being removed from feed ${this._id}`);
    await this.model('Event').deleteMany({ feed: this._id });

  }

  next();
});


FeedSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'feed',
  justOne: false
});

FeedSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'feed',
  justOne: false
});

module.exports = mongoose.model('Feed', FeedSchema);
