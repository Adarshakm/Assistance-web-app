import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
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
    content: {
      type: String,
      trim: true,
      default: '',
    },
    media: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    likes: {
      type: [String],
      default: [],
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;

