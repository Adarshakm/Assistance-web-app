import mongoose from 'mongoose';

const liveStreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Live stream title is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    host: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    hostName: {
      type: String,
      trim: true,
      default: '',
    },
    hostAvatar: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['live', 'ended'],
      default: 'live',
      index: true,
    },
    viewerCount: {
      type: Number,
      default: 1,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    streamKey: {
      type: String,
      default: () => 'stream_' + Math.random().toString(36).substring(2, 10),
    },
    comments: [
      {
        id: { type: String, default: () => 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6) },
        user: { type: String, required: true },
        userName: { type: String, default: '' },
        text: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

liveStreamSchema.index({ status: 1, createdAt: -1 });

const LiveStream = mongoose.models.LiveStream || mongoose.model('LiveStream', liveStreamSchema);

export default LiveStream;
