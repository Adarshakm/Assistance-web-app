import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    participants: [
      {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    ],
    lastMessage: {
      text: { type: String, default: '' },
      sender: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now },
      read: { type: Boolean, default: false },
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1, updatedAt: -1 });

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);

export default Conversation;
