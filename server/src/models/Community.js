import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

communitySchema.index({ creator: 1, createdAt: -1 });
communitySchema.index({ createdAt: -1 });

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);

export default Community;
