import mongoose from 'mongoose';

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    callerName: {
      type: String,
      trim: true,
      default: '',
    },
    callerAvatar: {
      type: String,
      default: '',
    },
    recipient: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    recipientName: {
      type: String,
      trim: true,
      default: '',
    },
    recipientAvatar: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['voice', 'video'],
      default: 'voice',
    },
    status: {
      type: String,
      enum: ['ringing', 'connected', 'rejected', 'ended', 'missed', 'busy'],
      default: 'ringing',
      index: true,
    },
    sdpOffer: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    sdpAnswer: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    callerCandidates: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    recipientCandidates: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    duration: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes for fast lookup
callSchema.index({ recipient: 1, status: 1, createdAt: -1 });
callSchema.index({ caller: 1, recipient: 1, createdAt: -1 });
callSchema.index({ status: 1, createdAt: -1 });

const Call = mongoose.models.Call || mongoose.model('Call', callSchema);

export default Call;
