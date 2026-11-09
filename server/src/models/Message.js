import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    receiver: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    attachment: {
      type: String,
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index for fast conversation message lookup sorted by time
messageSchema.index({ conversationId: 1, createdAt: 1 });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
