import mongoose from 'mongoose';

const viewerSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, trim: true, lowercase: true },
    username: { type: String, trim: true },
    displayName: { type: String, trim: true, default: '' },
    avatar: { type: String, default: '' },
    viewedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const replySchema = new mongoose.Schema(
  {
    user: { type: String, required: true, trim: true, lowercase: true },
    username: { type: String, trim: true },
    displayName: { type: String, trim: true, default: '' },
    avatar: { type: String, default: '' },
    content: { type: String, default: '' },
    reaction: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const stickerSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    type: { type: String, default: 'emoji' }, // 'emoji' | 'location' | 'time' | 'mention' | 'link'
    content: { type: String, default: '' },
    x: { type: Number, default: 50 }, // percentage
    y: { type: Number, default: 50 }, // percentage
  },
  { _id: false }
);

const storySchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    authorName: {
      type: String,
      trim: true,
      default: '',
    },
    authorAvatar: {
      type: String,
      default: '',
    },
    media: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      enum: ['image', 'video', 'text'],
      default: 'image',
    },
    backgroundColor: {
      type: String,
      default: '#18181b',
    },
    overlayText: {
      type: String,
      default: '',
    },
    textStyle: {
      color: { type: String, default: '#ffffff' },
      background: { type: String, default: 'transparent' },
      align: { type: String, default: 'center' },
      fontSize: { type: String, default: 'medium' },
      fontFamily: { type: String, default: 'sans' },
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    stickers: {
      type: [stickerSchema],
      default: [],
    },
    mentions: {
      type: [String],
      default: [],
    },
    link: {
      url: { type: String, default: '' },
      title: { type: String, default: '' },
    },
    audience: {
      type: String,
      enum: ['public', 'friends', 'close_friends', 'private'],
      default: 'public',
      index: true,
    },
    viewers: {
      type: [viewerSchema],
      default: [],
    },
    viewersCount: {
      type: Number,
      default: 0,
    },
    replies: {
      type: [replySchema],
      default: [],
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from creation
      index: true,
    },
  },
  { timestamps: true }
);

storySchema.index({ expiresAt: 1, isArchived: 1, author: 1 });

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

export default Story;
