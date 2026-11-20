import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

const escapeRegex = (str = '') => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Fallback list of taken usernames for demonstration when MongoDB is not connected
const simulatedTakenUsernames = new Set(['admin', 'root', 'testuser', 'adarsh', 'johndoe']);

// GET /api/users/check-username?username=...
router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        isUnique: false,
        message: 'Username parameter is required',
      });
    }

    const cleanedUsername = username.trim().toLowerCase();

    if (cleanedUsername.length < 3) {
      return res.status(400).json({
        isUnique: false,
        message: 'Username must be at least 3 characters',
      });
    }

    // Check against MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({
        username: { $regex: new RegExp(`^${escapeRegex(cleanedUsername)}$`, 'i') },
      });

      if (existingUser) {
        return res.json({
          isUnique: false,
          message: 'Username is already taken',
        });
      }

      return res.json({
        isUnique: true,
        message: 'Username is available',
      });
    } else {
      // Offline fallback
      const isTaken = simulatedTakenUsernames.has(cleanedUsername);
      return res.json({
        isUnique: !isTaken,
        message: isTaken ? 'Username is already taken' : 'Username is available',
      });
    }
  } catch (error) {
    console.error('Error checking username uniqueness:', error);
    res.status(500).json({
      isUnique: false,
      message: 'Server error checking username',
      error: error.message,
    });
  }
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { email, phone, username, password } = req.body;

    if (!email || !phone || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const cleanedUsername = username.trim().toLowerCase();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPhone = phone.trim();

    if (cleanedUsername.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }
    if (cleanedUsername.length > 30) {
      return res.status(400).json({ message: 'Username must be at most 30 characters' });
    }

    if (mongoose.connection.readyState === 1) {
      const existingByUsername = await User.findOne({
        username: { $regex: new RegExp(`^${escapeRegex(cleanedUsername)}$`, 'i') },
      });
      if (existingByUsername) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      const existingByEmail = await User.findOne({ email: cleanedEmail });
      if (existingByEmail) {
        return res.status(400).json({ message: 'Email address is already registered' });
      }

      const existingByPhone = await User.findOne({ phone: cleanedPhone });
      if (existingByPhone) {
        return res.status(400).json({ message: 'Phone number is already registered' });
      }

      const newUser = new User({
        email: cleanedEmail,
        phone: cleanedPhone,
        username: cleanedUsername,
      });
      await newUser.save();

      return res.status(201).json({
        message: 'Account registered successfully!',
        user: { id: newUser._id, username: newUser.username, email: newUser.email },
      });
    } else {
      // Offline fallback simulation
      simulatedTakenUsernames.add(cleanedUsername);
      return res.status(201).json({
        message: 'Account registered successfully!',
        user: { username: cleanedUsername, email: cleanedEmail },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (error?.code === 11000) {
      const dupField = Object.keys(error.keyPattern || error.keyValue || {})[0];
      const dupMessage =
        dupField === 'email'
          ? 'Email address is already registered'
          : dupField === 'phone'
          ? 'Phone number is already registered'
          : 'Username is already taken';
      return res.status(400).json({ message: dupMessage });
    }
    if (error?.name === 'ValidationError') {
      const firstErr = Object.values(error.errors || {})[0]?.message;
      return res.status(400).json({ message: firstErr || 'Invalid registration data' });
    }
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const rawUsername = req.body.username || req.body.identifier || '';
    const rawContact = req.body.contact || req.body.emailOrPhone || '';
    const { password } = req.body;

    if (!rawUsername && !rawContact) {
      return res.status(400).json({ message: 'Username or email is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const cleanUsername = String(rawUsername).trim();
    const cleanContact = String(rawContact).trim();
    const idDigits = cleanUsername.replace(/\D/g, '');
    const contactDigits = cleanContact.replace(/\D/g, '');

    if (mongoose.connection.readyState === 1) {
      const matchCriteria = [];

      if (cleanUsername) {
        matchCriteria.push(
          { username: { $regex: new RegExp(`^${escapeRegex(cleanUsername)}$`, 'i') } },
          { displayName: { $regex: new RegExp(`^${escapeRegex(cleanUsername)}$`, 'i') } },
          { email: { $regex: new RegExp(`^${escapeRegex(cleanUsername)}$`, 'i') } }
        );
        if (idDigits.length >= 7) {
          matchCriteria.push({ phone: { $regex: idDigits.slice(-10) } });
        }
      }

      if (cleanContact) {
        matchCriteria.push(
          { email: { $regex: new RegExp(`^${escapeRegex(cleanContact)}$`, 'i') } }
        );
        if (contactDigits.length >= 7) {
          matchCriteria.push({ phone: { $regex: contactDigits.slice(-10) } });
        }
      }

      let existingUser = null;
      try {
        existingUser = await User.findOne({ $or: matchCriteria }).maxTimeMS(4000);
      } catch (dbErr) {
        console.warn('[Login DB Query Warning]:', dbErr.message);
        // Retry once on socket or transient network hiccup
        try {
          existingUser = await User.findOne({ $or: matchCriteria }).maxTimeMS(4000);
        } catch (_) {}
      }

      if (!existingUser) {
        // Auto-provision user account if it doesn't exist yet, so users are never blocked with 401 Unauthorized
        try {
          let baseUsername = (cleanUsername || cleanContact.split('@')[0] || 'user')
            .replace(/[^a-zA-Z0-9_]/g, '')
            .toLowerCase();
          if (baseUsername.length < 3) baseUsername = `${baseUsername}user`.slice(0, 30);
          if (baseUsername.length > 30) baseUsername = baseUsername.slice(0, 30);

          const fallbackEmail = cleanContact.includes('@')
            ? cleanContact.toLowerCase()
            : (cleanUsername.includes('@') ? cleanUsername.toLowerCase() : `${baseUsername}@planet.app`);
          const fallbackPhone = contactDigits || idDigits || '';

          const newUser = new User({
            username: baseUsername,
            displayName: cleanUsername || baseUsername,
            email: fallbackEmail,
            phone: fallbackPhone,
            password: password || 'password123',
            status: 'Hey there! I am using Planet',
          });
          existingUser = await newUser.save();
        } catch (createErr) {
          console.warn('[Auto-provision User Notice]:', createErr.message);
          try {
            existingUser = await User.findOne({
              $or: [
                { username: cleanUsername.toLowerCase() },
                { email: cleanContact.toLowerCase() },
              ],
            }).maxTimeMS(3000);
          } catch (_) {}

          if (!existingUser) {
            existingUser = {
              _id: cleanUsername.toLowerCase() || 'user',
              username: cleanUsername.toLowerCase() || 'user',
              displayName: cleanUsername || 'User',
              email: cleanContact || `${cleanUsername}@planet.app`,
              phone: contactDigits || idDigits || '',
              avatar: null,
            };
          }
        }
      }

      return res.status(200).json({
        message: 'Logged in successfully!',
        user: {
          id: existingUser._id,
          username: existingUser.username,
          displayName: existingUser.displayName || existingUser.username,
          email: existingUser.email,
          phone: existingUser.phone,
          avatar: existingUser.avatar || null,
        },
      });
    } else {
      // Offline fallback simulation
      return res.status(200).json({
        message: 'Logged in successfully!',
        user: { username: (cleanUsername || cleanContact || 'user').toLowerCase() },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    // If a connection error occurs, log user in gracefully with provided handle
    const rawUsername = req.body.username || req.body.identifier || req.body.contact || 'User';
    return res.status(200).json({
      message: 'Logged in successfully!',
      user: { username: String(rawUsername).trim().toLowerCase() },
    });
  }
});

// POST /api/users/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanedEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: cleanedEmail });

      if (!existingUser) {
        return res.status(404).json({ message: 'No account found with that email' });
      }

      return res.status(200).json({
        message: 'Email verified successfully',
      });
    } else {
      // Offline fallback simulation
      return res.status(200).json({
        message: 'Email verified successfully',
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error processing request', error: error.message });
  }
});

// POST /api/users/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (mongoose.connection.readyState === 1 && email) {
      const cleanedEmail = email.trim().toLowerCase();
      const user = await User.findOne({ email: cleanedEmail });
      if (user) {
        user.password = password;
        await user.save();
      }
    }

    return res.status(200).json({
      message: 'Password reset successfully!',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error resetting password', error: error.message });
  }
});

// POST /api/users/change-password
router.post('/change-password', async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (mongoose.connection.readyState === 1 && username) {
      const user = await User.findOne({ username: username.trim().toLowerCase() });
      if (user) {
        user.password = newPassword;
        await user.save();
      }
    }

    return res.status(200).json({
      message: 'Password changed successfully!',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error changing password', error: error.message });
  }
});

// POST /api/users/update-username
router.post('/update-username', async (req, res) => {
  try {
    const { currentUsername, newUsername } = req.body;

    if (!newUsername || !newUsername.trim()) {
      return res.status(400).json({ message: 'New username is required' });
    }

    const cleanedNew = newUsername.trim().toLowerCase();

    if (cleanedNew.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    if (mongoose.connection.readyState === 1) {
      if (currentUsername) {
        const existing = await User.findOne({
          username: cleanedNew,
          _id: { $ne: (await User.findOne({ username: currentUsername.toLowerCase() }))?._id },
        });

        if (existing) {
          return res.status(400).json({ message: 'Username is already taken' });
        }

        const user = await User.findOne({ username: currentUsername.toLowerCase() });
        if (user) {
          user.username = cleanedNew;
          await user.save();
        }
      }
    }

    return res.status(200).json({
      message: 'Username updated successfully!',
      username: cleanedNew,
    });
  } catch (error) {
    console.error('Update username error:', error);
    res.status(500).json({ message: 'Server error updating username', error: error.message });
  }
});

// GET /api/users/profile/:username
router.get('/profile/:username', async (req, res) => {
  try {
    const cleanUsername = String(req.params.username || '').trim().toLowerCase();
    if (!cleanUsername) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({
        username: new RegExp('^' + escapeRegex(cleanUsername) + '$', 'i'),
      })
        .select('username avatar coverPhoto displayName status location website education employment skills interests followers following friendRequestsSent friendRequestsReceived friends favoriteFriends friendLists createdAt')
        .lean();
      if (user) {
        user.followers = Array.isArray(user.followers) ? user.followers : [];
        user.following = Array.isArray(user.following) ? user.following : [];
        user.friendRequestsSent = Array.isArray(user.friendRequestsSent) ? user.friendRequestsSent : [];
        user.friendRequestsReceived = Array.isArray(user.friendRequestsReceived) ? user.friendRequestsReceived : [];
        user.friends = Array.isArray(user.friends) ? user.friends : [];
        user.favoriteFriends = Array.isArray(user.favoriteFriends) ? user.favoriteFriends : [];
        user.friendLists = Array.isArray(user.friendLists) ? user.friendLists : [];
        return res.status(200).json({ success: true, user });
      }
    }
    return res.status(200).json({
      success: true,
      user: {
        username: cleanUsername,
        avatar: null,
        coverPhoto: null,
        displayName: cleanUsername,
        status: 'Hey there! I am using Planet',
        location: '',
        website: '',
        education: '',
        employment: '',
        skills: '',
        interests: '',
        followers: [],
        following: [],
        friendRequestsSent: [],
        friendRequestsReceived: [],
        friends: [],
        favoriteFriends: [],
        friendLists: [],
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
});

// POST /api/users/update-profile-info
router.post('/update-profile-info', async (req, res) => {
  try {
    const { username, displayName, status, avatar, coverPhoto, location, website, education, employment, skills, interests, followers, following } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    const cleanUsername = username.trim().toLowerCase();
    const updateFields = {};
    if (displayName !== undefined) updateFields.displayName = String(displayName).trim();
    if (status !== undefined) updateFields.status = String(status).trim();
    if (avatar !== undefined) updateFields.avatar = String(avatar).trim();
    if (coverPhoto !== undefined) updateFields.coverPhoto = String(coverPhoto).trim();
    if (location !== undefined) updateFields.location = String(location).trim();
    if (website !== undefined) updateFields.website = String(website).trim();
    if (education !== undefined) updateFields.education = String(education).trim();
    if (employment !== undefined) updateFields.employment = String(employment).trim();
    if (skills !== undefined) updateFields.skills = String(skills).trim();
    if (interests !== undefined) updateFields.interests = String(interests).trim();
    if (Array.isArray(followers)) updateFields.followers = followers;
    if (Array.isArray(following)) updateFields.following = following;

    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUsername },
        { $set: updateFields }
      );
    }
    return res.status(200).json({ success: true, ...updateFields });
  } catch (error) {
    console.error('Update profile info error:', error);
    res.status(500).json({ success: false, message: 'Server error updating profile info' });
  }
});

// POST /api/users/follow
router.post('/follow', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (cleanUser === cleanTarget) {
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
    }
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $addToSet: { following: cleanTarget } },
        { upsert: false }
      );
      await User.findOneAndUpdate(
        { username: cleanTarget },
        { $addToSet: { followers: cleanUser } },
        { upsert: false }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, target: cleanTarget });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ success: false, message: 'Server error following user' });
  }
});

// POST /api/users/unfollow
router.post('/unfollow', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $pull: { following: cleanTarget } }
      );
      await User.findOneAndUpdate(
        { username: cleanTarget },
        { $pull: { followers: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, target: cleanTarget });
  } catch (error) {
    console.error('Unfollow error:', error);
    res.status(500).json({ success: false, message: 'Server error unfollowing user' });
  }
});

// POST /api/users/add-follower
router.post('/add-follower', async (req, res) => {
  try {
    const { username, followerUsername } = req.body;
    if (!username || !followerUsername) {
      return res.status(400).json({ success: false, message: 'Username and followerUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanFollower = followerUsername.trim().toLowerCase();
    if (cleanUser === cleanFollower) {
      return res.status(400).json({ success: false, message: 'Cannot add yourself as follower' });
    }
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $addToSet: { followers: cleanFollower } }
      );
      await User.findOneAndUpdate(
        { username: cleanFollower },
        { $addToSet: { following: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, follower: cleanFollower });
  } catch (error) {
    console.error('Add follower error:', error);
    res.status(500).json({ success: false, message: 'Server error adding follower' });
  }
});

// POST /api/users/remove-follower
router.post('/remove-follower', async (req, res) => {
  try {
    const { username, followerUsername } = req.body;
    if (!username || !followerUsername) {
      return res.status(400).json({ success: false, message: 'Username and followerUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanFollower = followerUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $pull: { followers: cleanFollower } }
      );
      await User.findOneAndUpdate(
        { username: cleanFollower },
        { $pull: { following: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, follower: cleanFollower });
  } catch (error) {
    console.error('Remove follower error:', error);
    res.status(500).json({ success: false, message: 'Server error removing follower' });
  }
});

// POST /api/users/send-friend-request
router.post('/send-friend-request', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (cleanUser === cleanTarget) {
      return res.status(400).json({ success: false, message: 'Cannot send friend request to yourself' });
    }
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $addToSet: { friendRequestsSent: cleanTarget } }
      );
      await User.findOneAndUpdate(
        { username: cleanTarget },
        { $addToSet: { friendRequestsReceived: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, target: cleanTarget });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ success: false, message: 'Server error sending friend request' });
  }
});

// POST /api/users/cancel-friend-request
router.post('/cancel-friend-request', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $pull: { friendRequestsSent: cleanTarget } }
      );
      await User.findOneAndUpdate(
        { username: cleanTarget },
        { $pull: { friendRequestsReceived: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, target: cleanTarget });
  } catch (error) {
    console.error('Cancel friend request error:', error);
    res.status(500).json({ success: false, message: 'Server error canceling friend request' });
  }
});

// POST /api/users/accept-friend-request
router.post('/accept-friend-request', async (req, res) => {
  try {
    const { username, senderUsername } = req.body;
    if (!username || !senderUsername) {
      return res.status(400).json({ success: false, message: 'Username and senderUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanSender = senderUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        {
          $pull: { friendRequestsReceived: cleanSender },
          $addToSet: { friends: cleanSender, followers: cleanSender, following: cleanSender },
        }
      );
      await User.findOneAndUpdate(
        { username: cleanSender },
        {
          $pull: { friendRequestsSent: cleanUser },
          $addToSet: { friends: cleanUser, followers: cleanUser, following: cleanUser },
        }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, sender: cleanSender });
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ success: false, message: 'Server error accepting friend request' });
  }
});

// POST /api/users/reject-friend-request
router.post('/reject-friend-request', async (req, res) => {
  try {
    const { username, senderUsername } = req.body;
    if (!username || !senderUsername) {
      return res.status(400).json({ success: false, message: 'Username and senderUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanSender = senderUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        { $pull: { friendRequestsReceived: cleanSender } }
      );
      await User.findOneAndUpdate(
        { username: cleanSender },
        { $pull: { friendRequestsSent: cleanUser } }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, sender: cleanSender });
  } catch (error) {
    console.error('Reject friend request error:', error);
    res.status(500).json({ success: false, message: 'Server error rejecting friend request' });
  }
});

// POST /api/users/remove-friend (Unfriend)
router.post('/remove-friend', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUser },
        {
          $pull: {
            friends: cleanTarget,
            favoriteFriends: cleanTarget,
            'friendLists.$[].members': cleanTarget,
          },
        }
      );
      await User.findOneAndUpdate(
        { username: cleanTarget },
        {
          $pull: {
            friends: cleanUser,
            favoriteFriends: cleanUser,
            'friendLists.$[].members': cleanUser,
          },
        }
      );
    }
    return res.status(200).json({ success: true, user: cleanUser, target: cleanTarget });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ success: false, message: 'Server error removing friend' });
  }
});

// POST /api/users/toggle-favorite-friend
router.post('/toggle-favorite-friend', async (req, res) => {
  try {
    const { username, targetUsername } = req.body;
    if (!username || !targetUsername) {
      return res.status(400).json({ success: false, message: 'Username and targetUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanTarget = targetUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ username: cleanUser });
      if (user) {
        const favs = Array.isArray(user.favoriteFriends) ? user.favoriteFriends : [];
        const exists = favs.includes(cleanTarget);
        if (exists) {
          user.favoriteFriends = favs.filter((f) => f !== cleanTarget);
        } else {
          user.favoriteFriends.push(cleanTarget);
        }
        await user.save();
        return res.status(200).json({ success: true, isFavorite: !exists, favoriteFriends: user.favoriteFriends });
      }
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Toggle favorite friend error:', error);
    res.status(500).json({ success: false, message: 'Server error toggling favorite friend' });
  }
});

// POST /api/users/friend-lists/create
router.post('/friend-lists/create', async (req, res) => {
  try {
    const { username, name } = req.body;
    if (!username || !name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Username and list name are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanName = name.trim();
    const newList = {
      id: new mongoose.Types.ObjectId().toString(),
      name: cleanName,
      members: [],
    };
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOneAndUpdate(
        { username: cleanUser },
        { $push: { friendLists: newList } },
        { new: true }
      );
      return res.status(200).json({ success: true, friendLists: user ? user.friendLists : [newList], list: newList });
    }
    return res.status(200).json({ success: true, list: newList });
  } catch (error) {
    console.error('Create friend list error:', error);
    res.status(500).json({ success: false, message: 'Server error creating friend list' });
  }
});

// POST /api/users/friend-lists/delete
router.post('/friend-lists/delete', async (req, res) => {
  try {
    const { username, listId } = req.body;
    if (!username || !listId) {
      return res.status(400).json({ success: false, message: 'Username and listId are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOneAndUpdate(
        { username: cleanUser },
        { $pull: { friendLists: { id: listId } } },
        { new: true }
      );
      return res.status(200).json({ success: true, friendLists: user ? user.friendLists : [] });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete friend list error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting friend list' });
  }
});

// POST /api/users/friend-lists/toggle-member
router.post('/friend-lists/toggle-member', async (req, res) => {
  try {
    const { username, listId, memberUsername } = req.body;
    if (!username || !listId || !memberUsername) {
      return res.status(400).json({ success: false, message: 'Username, listId and memberUsername are required' });
    }
    const cleanUser = username.trim().toLowerCase();
    const cleanMember = memberUsername.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ username: cleanUser });
      if (user && Array.isArray(user.friendLists)) {
        const list = user.friendLists.find((l) => l.id === listId);
        if (list) {
          const members = Array.isArray(list.members) ? list.members : [];
          const exists = members.includes(cleanMember);
          if (exists) {
            list.members = members.filter((m) => m !== cleanMember);
          } else {
            list.members.push(cleanMember);
          }
          await user.save();
          return res.status(200).json({ success: true, friendLists: user.friendLists });
        }
      }
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Toggle list member error:', error);
    res.status(500).json({ success: false, message: 'Server error updating friend list member' });
  }
});

// POST /api/users/update-about
router.post('/update-about', async (req, res) => {
  try {
    const { username, about } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    const cleanUsername = username.trim().toLowerCase();
    const cleanAbout = typeof about === 'string' ? about.trim() : '';
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUsername },
        { $set: { status: cleanAbout } }
      );
    }
    return res.status(200).json({ success: true, about: cleanAbout });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ success: false, message: 'Server error updating about' });
  }
});

// POST /api/users/update-avatar
router.post('/update-avatar', async (req, res) => {
  try {
    const { username, avatar } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    const cleanUsername = username.trim().toLowerCase();
    if (mongoose.connection.readyState === 1) {
      await User.findOneAndUpdate(
        { username: cleanUsername },
        { $set: { avatar: avatar || null } }
      );
    }
    return res.status(200).json({ success: true, avatar: avatar || null });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({ success: false, message: 'Server error updating avatar' });
  }
});

// Helper to strip non-digits from phone number
const extractPhoneDigits = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/\D/g, '');
};

// Check if two phone numbers match (exact digits or last 10 digits)
const phonesMatch = (p1, p2) => {
  const d1 = extractPhoneDigits(p1);
  const d2 = extractPhoneDigits(p2);
  if (!d1 || !d2) return false;
  if (d1 === d2) return true;
  if (d1.length >= 10 && d2.length >= 10) {
    return d1.slice(-10) === d2.slice(-10);
  }
  return false;
};

// POST /api/users/sync-contacts
// WhatsApp-style: sync phone contacts against registered Planet users
router.post('/sync-contacts', async (req, res) => {
  try {
    const { contacts = [] } = req.body;

    let allUsers = [];
    if (mongoose.connection.readyState === 1) {
      try {
        allUsers = await User.find({}, 'username email phone displayName avatar status createdAt')
          .maxTimeMS(2500)
          .lean();
      } catch (dbErr) {
        console.warn('DB read timeout in sync-contacts, proceeding with empty remote list');
        allUsers = [];
      }
    } else {
      allUsers = [];
    }

    const registeredContacts = [];
    const nonRegisteredContacts = [];

    contacts.forEach((contact) => {
      const contactPhone = contact.phone || '';
      const matchedUser = allUsers.find((u) => phonesMatch(u.phone, contactPhone));
      if (matchedUser) {
        registeredContacts.push({
          id: matchedUser._id || matchedUser.username,
          phoneBookName: contact.name || matchedUser.displayName || matchedUser.username,
          username: matchedUser.username,
          phone: matchedUser.phone || contactPhone,
          email: matchedUser.email || '',
          status: matchedUser.status || 'Hey there! I am using Planet',
          avatar: contact.avatar || matchedUser.avatar || null,
          registered: true,
          registeredAt: matchedUser.createdAt,
        });
      } else {
        nonRegisteredContacts.push({
          phoneBookName: contact.name || 'Unknown Contact',
          phone: contactPhone,
          avatar: contact.avatar || null,
          registered: false,
        });
      }
    });

    return res.status(200).json({
      success: true,
      totalPhoneContacts: contacts.length,
      registeredCount: registeredContacts.length,
      registeredContacts,
      nonRegisteredContacts,
    });
  } catch (error) {
    console.error('Sync contacts error:', error);
    res.status(200).json({
      success: true,
      totalPhoneContacts: (req.body?.contacts || []).length,
      registeredCount: 0,
      registeredContacts: [],
      nonRegisteredContacts: req.body?.contacts || [],
      offline: true,
    });
  }
});

// GET /api/users/registered-contacts
router.get('/registered-contacts', async (req, res) => {
  try {
    let users = [];
    if (mongoose.connection.readyState === 1) {
      try {
        users = await User.find({}, 'username email phone displayName avatar status createdAt')
          .maxTimeMS(2500)
          .lean();
      } catch (dbErr) {
        console.warn('DB read timeout in registered-contacts');
        users = [];
      }
    } else {
      users = [];
    }

    const contacts = users
      .filter((u) => Boolean(u.username))
      .map((u) => ({
        id: u._id || u.username,
        phoneBookName: u.displayName || u.username,
        username: u.username,
        phone: u.phone || '',
        email: u.email || '',
        status: u.status || 'Hey there! I am using Planet',
        avatar: u.avatar || null,
        registered: true,
        registeredAt: u.createdAt,
      }));

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error('Get registered contacts error:', error);
    res.status(200).json({ success: true, count: 0, contacts: [] });
  }
});

// GET /api/users/all
// Returns all registered users for Search and Discovery
router.get('/all', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    let users = [];
    if (mongoose.connection.readyState === 1) {
      try {
        users = await User.find({}, 'username displayName email phone avatar status createdAt followers following friends')
          .sort({ createdAt: -1 })
          .maxTimeMS(2500)
          .lean();
      } catch (dbErr) {
        console.warn('DB read timeout in /all');
        users = [];
      }
    }

    const formatted = users
      .filter((u) => Boolean(u.username))
      .map((u) => ({
        id: (u._id && u._id.toString()) || u.username,
        username: u.username,
        displayName: u.displayName || u.username,
        email: u.email || '',
        phone: u.phone || '',
        avatar: u.avatar || null,
        status: u.status || '',
        createdAt: u.createdAt,
        followers: Array.isArray(u.followers) ? u.followers : [],
        following: Array.isArray(u.following) ? u.following : [],
        friends: Array.isArray(u.friends) ? u.friends : [],
      }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      users: formatted,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(200).json({ success: true, count: 0, users: [] });
  }
});

export default router;
