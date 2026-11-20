import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import Community from '../models/Community.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const communityUploadsDir = path.resolve(__dirname, '../../uploads/communities');

if (!fs.existsSync(communityUploadsDir)) {
  try {
    fs.mkdirSync(communityUploadsDir, { recursive: true });
  } catch (_) {}
}

/**
 * Helper to save base64 avatar images to disk
 */
const saveBase64Image = (base64String = '') => {
  if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:')) {
    return base64String;
  }
  try {
    const commaIndex = base64String.indexOf(',');
    if (commaIndex === -1) return '';
    const header = base64String.substring(0, commaIndex);
    const base64Data = base64String.substring(commaIndex + 1);
    const mimeMatch = header.match(/data:([^;]+)/);
    const mimeType = (mimeMatch ? mimeMatch[1] : '').toLowerCase();
    const ext = mimeType.includes('png') ? '.png' : mimeType.includes('webp') ? '.webp' : '.jpg';
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `community-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const targetPath = path.join(communityUploadsDir, filename);
    fs.writeFileSync(targetPath, buffer);
    return `/uploads/communities/${filename}`;
  } catch (err) {
    console.error('[Save Community Image Error]:', err);
    return '';
  }
};

const router = express.Router();

/**
 * POST /api/communities/create
 * Create a new community
 */
router.post('/create', async (req, res) => {
  try {
    const { name, description, creator, creatorName, avatar, privacy, category } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Community name is required.',
      });
    }

    const cleanName = String(name).trim();
    if (cleanName.length < 2 || cleanName.length > 60) {
      return res.status(400).json({
        success: false,
        error: 'Community name must be between 2 and 60 characters.',
      });
    }

    const cleanCreator = String(creator || 'anonymous').trim().toLowerCase();
    const cleanCreatorName = String(creatorName || cleanCreator).trim();
    const cleanDesc = String(description || '').trim();
    const cleanPrivacy = privacy === 'private' ? 'private' : 'public';
    const cleanCategory = String(category || 'General').trim();

    let finalAvatar = avatar || '';
    if (finalAvatar && finalAvatar.startsWith('data:')) {
      finalAvatar = saveBase64Image(finalAvatar);
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: simulate successful creation
      const simulatedCommunity = {
        _id: 'offline-' + Date.now(),
        name: cleanName,
        description: cleanDesc,
        creator: cleanCreator,
        creatorName: cleanCreatorName,
        avatar: finalAvatar,
        privacy: cleanPrivacy,
        category: cleanCategory,
        members: [{ username: cleanCreator, role: 'admin', joinedAt: new Date() }],
        memberCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        offline: true,
      };
      return res.status(201).json({
        success: true,
        message: 'Community created successfully (offline mode).',
        community: simulatedCommunity,
      });
    }

    const newCommunity = new Community({
      name: cleanName,
      description: cleanDesc,
      creator: cleanCreator,
      creatorName: cleanCreatorName,
      avatar: finalAvatar,
      privacy: cleanPrivacy,
      category: cleanCategory,
      members: [
        {
          username: cleanCreator,
          role: 'admin',
          joinedAt: new Date(),
        },
      ],
      memberCount: 1,
    });

    const saved = await newCommunity.save();

    return res.status(201).json({
      success: true,
      message: 'Community created successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Create Community Error]:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to create community.',
    });
  }
});

/**
 * GET /api/communities
 * List all communities
 */
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 0,
        communities: [],
        offline: true,
      });
    }

    const communities = await Community.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      count: communities.length,
      communities,
    });
  } catch (err) {
    console.error('[Get Communities Error]:', err);
    return res.status(200).json({
      success: true,
      count: 0,
      communities: [],
      offline: true,
    });
  }
});

/**
 * GET /api/communities/my
 * List communities created by or joined by the current user
 */
router.get('/my', async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User parameter is required.',
      });
    }

    const cleanUser = String(user).trim().toLowerCase();

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 0,
        communities: [],
        offline: true,
      });
    }

    const communities = await Community.find({
      $or: [{ creator: cleanUser }, { 'members.username': cleanUser }],
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: communities.length,
      communities,
    });
  } catch (err) {
    console.error('[Get My Communities Error]:', err);
    return res.status(200).json({
      success: true,
      count: 0,
      communities: [],
      offline: true,
    });
  }
});

/**
 * GET /api/communities/:id
 * Get details for a single community
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID required.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ success: false, error: 'Community not found (offline mode).' });
    }

    const community = await Community.findById(id).lean();
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    return res.status(200).json({
      success: true,
      community,
    });
  } catch (err) {
    console.error('[Get Single Community Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve community.' });
  }
});

/**
 * PUT /api/communities/:id
 * Edit community details (creator only)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, avatar, privacy, category, user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, error: 'Community name is required.' });
    }

    const cleanName = String(name).trim();
    if (cleanName.length < 2 || cleanName.length > 60) {
      return res.status(400).json({
        success: false,
        error: 'Community name must be between 2 and 60 characters.',
      });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    const cleanDesc = String(description !== undefined ? description : '').trim();
    const cleanPrivacy = privacy === 'private' ? 'private' : 'public';
    const cleanCategory = String(category || 'General').trim();

    let finalAvatar = avatar;
    if (finalAvatar && typeof finalAvatar === 'string' && finalAvatar.startsWith('data:')) {
      finalAvatar = saveBase64Image(finalAvatar);
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: return updated mock
      const updatedCommunity = {
        _id: id,
        name: cleanName,
        description: cleanDesc,
        avatar: finalAvatar || '',
        privacy: cleanPrivacy,
        category: cleanCategory,
        creator: cleanUser,
        updatedAt: new Date(),
        offline: true,
      };
      return res.status(200).json({
        success: true,
        message: 'Community details updated successfully (offline mode).',
        community: updatedCommunity,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    if (cleanUser && community.creator && community.creator !== cleanUser) {
      return res.status(403).json({
        success: false,
        error: 'Only the community creator can edit its details.',
      });
    }

    community.name = cleanName;
    community.description = cleanDesc;
    community.privacy = cleanPrivacy;
    community.category = cleanCategory;
    if (finalAvatar !== undefined) {
      community.avatar = finalAvatar;
    }
    community.updatedAt = new Date();

    const saved = await community.save();

    return res.status(200).json({
      success: true,
      message: 'Community details updated successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Update Community Error]:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to update community.',
    });
  }
});

/**
 * PATCH /api/communities/:id
 * Forward patch requests to put logic
 */
router.patch('/:id', async (req, res, next) => {
  req.method = 'PUT';
  router.handle(req, res, next);
});

/**
 * DELETE /api/communities/:id
 * Delete a community (creator only)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID required.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, message: 'Community deleted (offline mode).' });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    if (community.creator !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Only the community creator can delete it.' });
    }

    await Community.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Community deleted successfully.',
    });
  } catch (err) {
    console.error('[Delete Community Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete community.' });
  }
});

/**
 * POST /api/communities/:id/join
 * Join a community
 */
router.post('/:id/join', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    if (!cleanUser) {
      return res.status(400).json({ success: false, error: 'User is required to join.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Joined community successfully (offline mode).',
        member: { username: cleanUser, role: 'member', joinedAt: new Date() },
        offline: true,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    const alreadyMember = Array.isArray(community.members) && community.members.some(
      (m) => (m.username && m.username.toLowerCase() === cleanUser) || m === cleanUser
    );

    if (alreadyMember) {
      return res.status(200).json({
        success: true,
        message: 'Already a member of this community.',
        community,
      });
    }

    community.members.push({
      username: cleanUser,
      role: 'member',
      joinedAt: new Date(),
    });
    community.memberCount = community.members.length;
    const saved = await community.save();

    return res.status(200).json({
      success: true,
      message: 'Joined community successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Join Community Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to join community.' });
  }
});

/**
 * POST /api/communities/:id/leave
 * Leave a community
 */
router.post('/:id/leave', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    if (!cleanUser) {
      return res.status(400).json({ success: false, error: 'User is required to leave.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Left community successfully (offline mode).',
        offline: true,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    if (community.creator && community.creator.toLowerCase() === cleanUser) {
      return res.status(400).json({
        success: false,
        error: 'The creator cannot leave their own community. You may delete it instead.',
      });
    }

    community.members = community.members.filter(
      (m) => (m.username && m.username.toLowerCase() !== cleanUser) && m !== cleanUser
    );
    community.memberCount = Math.max(1, community.members.length);
    const saved = await community.save();

    return res.status(200).json({
      success: true,
      message: 'Left community successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Leave Community Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to leave community.' });
  }
});

export default router;
