const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },

    kind: {
      type: String,
      enum: ['post', 'event', 'poll'],
      required: true
    },

    totalComments: {
      type: Number,
      default: 0
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

    poll: {
      type: mongoose.Schema.ObjectId,
      ref: 'Poll',
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
FeedSchema.post('remove', async function (next) {

  console.log(`Comments being removed from feed ${this._id}`);
  await this.model('Comment').deleteMany({ feed: this._id });

  if(this.kind === 'post') {

    console.log(`Posts being removed from feed ${this._id}`);
    await this.model('Post').deleteMany({ _id: this.post });

  }

  if(this.kind === 'event') {

    console.log(`Events being removed from feed ${this._id}`);
    await this.model('Event').deleteMany({ _id: this.event });
    console.log(`Events being removed from EventUser ${this._id}`);
    await this.model('EventUser').deleteMany({ event: this.event });

  }

  if(this.kind === 'poll') {

    console.log(`Poll being removed from feed ${this._id}`);
    await this.model('Poll').deleteMany({ _id: this.poll });
    console.log(`pollings being removed from PollUser ${this._id}`);
    await this.model('PollUser').deleteMany({ poll: this.poll });

  }
});

FeedSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'feed',
  justOne: false
});

FeedSchema.virtual('post-content', {
  ref: 'Post',
  localField: 'post',
  foreignField: '_id',
  justOne: true
});


FeedSchema.virtual('event-content', {
  ref: 'Event',
  localField: 'event',
  foreignField: '_id',
  justOne: true
});

FeedSchema.virtual('poll-content', {
  ref: 'Poll',
  localField: 'poll',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Feed', FeedSchema);
