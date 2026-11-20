import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
      maxlength: 140,
    },
    content: {
      type: String,
      required: [true, 'Announcement content is required'],
      trim: true,
      maxlength: 3000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
    tag: {
      type: String,
      enum: ['important', 'update', 'event', 'general'],
      default: 'important',
    },
    isPinned: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const discussionCommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: 1000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Discussion title is required'],
      trim: true,
      maxlength: 160,
    },
    content: {
      type: String,
      required: [true, 'Discussion content is required'],
      trim: true,
      maxlength: 4000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    likes: [{ type: String, lowercase: true }],
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: [discussionCommentSchema],
    commentsCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Community name is required'],
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
    },
    creator: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    creatorName: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    privacy: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    members: [
      {
        username: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        role: {
          type: String,
          enum: ['admin', 'moderator', 'member'],
          default: 'member',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    memberCount: {
      type: Number,
      default: 1,
    },
    announcements: [announcementSchema],
    discussions: [discussionSchema],
  },
  { timestamps: true }
);

communitySchema.index({ creator: 1, createdAt: -1 });
communitySchema.index({ createdAt: -1 });

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);

export default Community;
