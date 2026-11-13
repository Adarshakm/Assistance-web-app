import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      default: 'Hey there! I am using Assistance',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    education: {
      type: String,
      trim: true,
      default: '',
    },
    employment: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: String,
      trim: true,
      default: '',
    },
    interests: {
      type: String,
      trim: true,
      default: '',
    },
    followers: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    following: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    friendRequestsSent: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    friendRequestsReceived: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
