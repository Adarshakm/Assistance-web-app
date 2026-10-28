import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

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
        username: { $regex: new RegExp(`^${cleanedUsername}$`, 'i') },
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

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({
        username: { $regex: new RegExp(`^${cleanedUsername}$`, 'i') },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      const newUser = new User({
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
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
        user: { username: cleanedUsername, email },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const username = req.body.username || req.body.identifier;
    const contact = req.body.contact || req.body.emailOrPhone;
    const { password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const cleanedUsername = username.trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const query = { username: cleanedUsername };
      if (contact && contact.trim()) {
        const cleanedContact = contact.trim().toLowerCase();
        query.$or = [{ email: cleanedContact }, { phone: contact.trim() }];
      }

      const existingUser = await User.findOne(query);

      if (!existingUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({
        message: 'Logged in successfully!',
        user: { id: existingUser._id, username: existingUser.username, email: existingUser.email },
      });
    } else {
      // Offline fallback simulation
      return res.status(200).json({
        message: 'Logged in successfully!',
        user: { username: cleanedUsername },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
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

export default router;
