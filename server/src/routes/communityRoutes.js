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

// Fallback demo communities with discussions & announcements for instant rich experience
const getDemoCommunities = () => [
  {
    _id: 'comm_tech_innovators',
    id: 'comm_tech_innovators',
    name: 'Tech Innovators & Builders',
    description: 'A vibrant hub for software engineers, designers, and AI creators building next-gen web applications.',
    creator: 'alexchen',
    creatorName: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    privacy: 'public',
    category: 'Technology',
    members: [
      { username: 'alexchen', role: 'admin', joinedAt: new Date(Date.now() - 86400000 * 10) },
      { username: 'sophia_p', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 8) },
      { username: 'david', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 5) },
    ],
    memberCount: 248,
    announcements: [
      {
        _id: 'ann_1',
        id: 'ann_1',
        title: '📢 Welcome to the Community Hub & Discussion Feed!',
        content: 'We are thrilled to launch official community discussion feeds and announcement publishing! Please review our community guidelines, start exciting discussions, and share your projects.',
        author: 'alexchen',
        authorName: 'Alex Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        tag: 'important',
        isPinned: true,
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
      {
        _id: 'ann_2',
        id: 'ann_2',
        title: '🚀 Community Hackathon Starts This Friday',
        content: 'Join us for a 48-hour virtual hackathon with project showcase and mentor feedback. Submissions open on Friday at 9:00 AM UTC.',
        author: 'alexchen',
        authorName: 'Alex Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        tag: 'event',
        isPinned: true,
        createdAt: new Date(Date.now() - 3600000 * 20),
      },
    ],
    discussions: [
      {
        _id: 'disc_1',
        id: 'disc_1',
        title: 'What frontend frameworks are you using for real-time collaboration in 2026?',
        content: 'We are currently evaluating React 19 with WebSockets and WebRTC for high-frequency state synchronization. What has been your team\'s experience with performance at scale?',
        author: 'sophia_p',
        authorName: 'Sophia Patel',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        category: 'Tech Stack',
        likes: ['alexchen', 'david'],
        likesCount: 14,
        comments: [
          {
            _id: 'com_1',
            id: 'com_1',
            content: 'React with optimistic UI updates and local caching works wonders for offline resilience!',
            author: 'alexchen',
            authorName: 'Alex Chen',
            authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            createdAt: new Date(Date.now() - 3600000 * 2),
          },
          {
            _id: 'com_2',
            id: 'com_2',
            content: 'Completely agree. Also make sure to debounce broadcast signals to avoid network saturation on mobile.',
            author: 'david',
            authorName: 'David Miller',
            authorAvatar: '',
            createdAt: new Date(Date.now() - 3600000 * 1),
          },
        ],
        commentsCount: 2,
        createdAt: new Date(Date.now() - 3600000 * 6),
      },
      {
        _id: 'disc_2',
        id: 'disc_2',
        title: 'Best design practices for responsive modal dialogs on mobile web',
        content: 'When designing full-screen modals vs bottom action sheets, what guidelines do you follow for touch interactions and backdrop taps? Share your recommendations!',
        author: 'elena_rostova',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        category: 'UI/UX Design',
        likes: ['alexchen'],
        likesCount: 8,
        comments: [],
        commentsCount: 0,
        createdAt: new Date(Date.now() - 3600000 * 12),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    _id: 'comm_creative_arts',
    id: 'comm_creative_arts',
    name: 'Creative Artists & Photographers',
    description: 'Share your photography, digital illustrations, creative writing, and inspire the community.',
    creator: 'elena_rostova',
    creatorName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&auto=format&fit=crop&q=80',
    privacy: 'public',
    category: 'Creative & Arts',
    members: [
      { username: 'elena_rostova', role: 'admin', joinedAt: new Date(Date.now() - 86400000 * 14) },
      { username: 'sarah_jenkins', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 7) },
    ],
    memberCount: 182,
    announcements: [
      {
        _id: 'ann_art_1',
        id: 'ann_art_1',
        title: '🎨 Weekly Photo Challenge: Golden Hour & Shadows',
        content: 'Submit your best sunset and shadow photography to the discussion feed before Sunday evening. Winners will be featured in the community showcase!',
        author: 'elena_rostova',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        tag: 'event',
        isPinned: true,
        createdAt: new Date(Date.now() - 3600000 * 8),
      },
    ],
    discussions: [
      {
        _id: 'disc_art_1',
        id: 'disc_art_1',
        title: 'What prime lenses do you recommend for street photography?',
        content: 'Looking to pick up a lightweight 35mm or 50mm f/1.8 for everyday city walks. Any favorite brands or focal lengths?',
        author: 'sarah_jenkins',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        category: 'Gear Talk',
        likes: ['elena_rostova'],
        likesCount: 9,
        comments: [],
        commentsCount: 0,
        createdAt: new Date(Date.now() - 3600000 * 14),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 14),
  },
];

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
        members: [],
        memberCount: 0,
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
      members: [],
      memberCount: 0,
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
      const demo = getDemoCommunities();
      return res.status(200).json({
        success: true,
        count: demo.length,
        communities: demo,
        offline: true,
      });
    }

    const communities = await Community.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .maxTimeMS(3000)
      .lean();

    if (!communities || communities.length === 0) {
      const demo = getDemoCommunities();
      return res.status(200).json({
        success: true,
        count: demo.length,
        communities: demo,
      });
    }

    return res.status(200).json({
      success: true,
      count: communities.length,
      communities,
    });
  } catch (err) {
    console.error('[Get Communities Error]:', err);
    if (res.headersSent) return;
    const demo = getDemoCommunities();
    return res.status(200).json({
      success: true,
      count: demo.length,
      communities: demo,
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
      const demo = getDemoCommunities().filter(
        c => (c.creator && c.creator.toLowerCase() === cleanUser) ||
             (Array.isArray(c.members) && c.members.some(m => (m.username || m).toLowerCase() === cleanUser))
      );
      return res.status(200).json({
        success: true,
        count: demo.length,
        communities: demo,
        offline: true,
      });
    }

    const communities = await Community.find({
      $or: [{ creator: cleanUser }, { 'members.username': cleanUser }],
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .maxTimeMS(3000)
      .lean();

    return res.status(200).json({
      success: true,
      count: communities.length,
      communities,
    });
  } catch (err) {
    console.error('[Get My Communities Error]:', err);
    if (res.headersSent) return;
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

    // Check demo communities first if id matches or offline
    const demoFound = getDemoCommunities().find(c => c._id === id || c.id === id);
    if (demoFound) {
      return res.status(200).json({
        success: true,
        community: demoFound,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    const community = await Community.findById(id).maxTimeMS(3000).lean();
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    return res.status(200).json({
      success: true,
      community,
    });
  } catch (err) {
    console.error('[Get Single Community Error]:', err);
    if (res.headersSent) return;
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

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(id)) {
      // Offline / local ID fallback: return updated mock
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
        message: 'Community details updated successfully.',
        community: updatedCommunity,
      });
    }

    let community = await Community.findById(id).maxTimeMS(3000);
    if (!community) {
      // If community existed in local storage or client session, upsert it into MongoDB
      community = new Community({
        _id: new mongoose.Types.ObjectId(id),
        name: cleanName,
        description: cleanDesc,
        creator: cleanUser || 'user',
        creatorName: cleanUser || 'User',
        avatar: finalAvatar || '',
        privacy: cleanPrivacy,
        category: cleanCategory,
        members: [{ username: cleanUser || 'user', role: 'admin', joinedAt: new Date() }],
        memberCount: 1,
      });
    } else {
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
    }

    const saved = await community.save();

    return res.status(200).json({
      success: true,
      message: 'Community details updated successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Update Community Error]:', err);
    if (res.headersSent) return;
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
 * Delete a community (creator only, idempotent)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, message: 'Community deleted successfully.' });
    }

    const community = await Community.findById(id).maxTimeMS(3000);
    if (!community) {
      // Idempotent delete: community is already removed
      return res.status(200).json({ success: true, message: 'Community already removed.' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    if (cleanUser && community.creator && community.creator !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Only the community creator can delete it.' });
    }

    await Community.findByIdAndDelete(id).maxTimeMS(3000);

    return res.status(200).json({
      success: true,
      message: 'Community deleted successfully.',
    });
  } catch (err) {
    console.error('[Delete Community Error]:', err);
    if (res.headersSent) return;
    return res.status(200).json({ success: true, message: 'Community already removed.' });
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

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Joined community successfully (offline mode).',
        member: { username: cleanUser, role: 'member', joinedAt: new Date() },
        offline: true,
      });
    }

    const community = await Community.findById(id).maxTimeMS(3000);
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
    if (res.headersSent) return;
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

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Left community successfully (offline mode).',
        offline: true,
      });
    }

    const community = await Community.findById(id).maxTimeMS(3000);
    if (!community) {
      // Idempotent leave: if already deleted/gone, it is left
      return res.status(200).json({ success: true, message: 'Community already left.' });
    }

    community.members = community.members.filter(
      (m) => (m.username && m.username.toLowerCase() !== cleanUser) && m !== cleanUser
    );
    community.memberCount = community.members.length;
    const saved = await community.save();

    return res.status(200).json({
      success: true,
      message: 'Left community successfully.',
      community: saved,
    });
  } catch (err) {
    console.error('[Leave Community Error]:', err);
    if (res.headersSent) return;
    return res.status(500).json({ success: false, error: 'Failed to leave community.' });
  }
});

/**
 * GET /api/communities/:id/feed
 * Retrieve community feed (announcements & discussions)
 */
router.get('/:id/feed', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }

    const demoFound = getDemoCommunities().find(c => c._id === id || c.id === id);
    if (demoFound) {
      return res.status(200).json({
        success: true,
        announcements: demoFound.announcements || [],
        discussions: demoFound.discussions || [],
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        announcements: [],
        discussions: [],
        offline: true,
      });
    }

    const community = await Community.findById(id).select('announcements discussions').lean();
    if (!community) {
      return res.status(404).json({ success: false, error: 'Community not found.' });
    }

    return res.status(200).json({
      success: true,
      announcements: community.announcements || [],
      discussions: community.discussions || [],
    });
  } catch (err) {
    console.error('[Get Community Feed Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve feed.' });
  }
});

/**
 * POST /api/communities/:id/announcements
 * Publish community announcement
 */
router.post('/:id/announcements', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, authorName, authorAvatar, tag, isPinned } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }
    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, error: 'Announcement title is required.' });
    }
    if (!content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: 'Announcement content is required.' });
    }

    const newAnnouncement = {
      _id: 'ann_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: String(title).trim(),
      content: String(content).trim(),
      author: String(author || 'anonymous').trim().toLowerCase(),
      authorName: String(authorName || author || 'Community Admin').trim(),
      authorAvatar: String(authorAvatar || '').trim(),
      tag: ['important', 'event', 'update', 'general'].includes(tag) ? tag : 'important',
      isPinned: Boolean(isPinned !== false),
      createdAt: new Date(),
    };

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Announcement published successfully (local mode).',
        announcement: newAnnouncement,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(201).json({
        success: true,
        message: 'Announcement published successfully.',
        announcement: newAnnouncement,
      });
    }

    if (!Array.isArray(community.announcements)) {
      community.announcements = [];
    }
    community.announcements.unshift(newAnnouncement);
    community.updatedAt = new Date();
    await community.save();

    const savedAnnouncement = community.announcements[0];
    return res.status(201).json({
      success: true,
      message: 'Announcement published successfully.',
      announcement: savedAnnouncement,
    });
  } catch (err) {
    console.error('[Publish Announcement Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to publish announcement.' });
  }
});

/**
 * POST /api/communities/:id/discussions
 * Create a new discussion thread
 */
router.post('/:id/discussions', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, authorName, authorAvatar, category } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Community ID is required.' });
    }
    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, error: 'Discussion title is required.' });
    }
    if (!content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: 'Discussion content is required.' });
    }

    const newDiscussion = {
      _id: 'disc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: String(title).trim(),
      content: String(content).trim(),
      author: String(author || 'anonymous').trim().toLowerCase(),
      authorName: String(authorName || author || 'Member').trim(),
      authorAvatar: String(authorAvatar || '').trim(),
      category: String(category || 'General').trim(),
      likes: [],
      likesCount: 0,
      comments: [],
      commentsCount: 0,
      createdAt: new Date(),
    };

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Discussion created successfully (local mode).',
        discussion: newDiscussion,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(201).json({
        success: true,
        message: 'Discussion created successfully.',
        discussion: newDiscussion,
      });
    }

    if (!Array.isArray(community.discussions)) {
      community.discussions = [];
    }
    community.discussions.unshift(newDiscussion);
    community.updatedAt = new Date();
    await community.save();

    const savedDiscussion = community.discussions[0];
    return res.status(201).json({
      success: true,
      message: 'Discussion created successfully.',
      discussion: savedDiscussion,
    });
  } catch (err) {
    console.error('[Create Discussion Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to create discussion.' });
  }
});

/**
 * POST /api/communities/:id/discussions/:discussionId/comment
 * Add reply / comment to discussion thread
 */
router.post('/:id/discussions/:discussionId/comment', async (req, res) => {
  try {
    const { id, discussionId } = req.params;
    const { content, author, authorName, authorAvatar } = req.body;

    if (!content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: 'Comment content is required.' });
    }

    const newComment = {
      _id: 'com_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      content: String(content).trim(),
      author: String(author || 'anonymous').trim().toLowerCase(),
      authorName: String(authorName || author || 'Member').trim(),
      authorAvatar: String(authorAvatar || '').trim(),
      createdAt: new Date(),
    };

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Comment added successfully.',
        comment: newComment,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(201).json({
        success: true,
        message: 'Comment added successfully.',
        comment: newComment,
      });
    }

    const discussion = community.discussions?.id(discussionId) ||
      community.discussions?.find(d => String(d._id) === String(discussionId) || String(d.id) === String(discussionId));

    if (!discussion) {
      return res.status(404).json({ success: false, error: 'Discussion not found.' });
    }

    if (!Array.isArray(discussion.comments)) {
      discussion.comments = [];
    }
    discussion.comments.push(newComment);
    discussion.commentsCount = discussion.comments.length;
    await community.save();

    return res.status(201).json({
      success: true,
      message: 'Comment added successfully.',
      comment: discussion.comments[discussion.comments.length - 1],
    });
  } catch (err) {
    console.error('[Add Discussion Comment Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to add comment.' });
  }
});

/**
 * POST /api/communities/:id/discussions/:discussionId/like
 * Like or unlike a discussion thread
 */
router.post('/:id/discussions/:discussionId/like', async (req, res) => {
  try {
    const { id, discussionId } = req.params;
    const { user } = req.body;
    const cleanUser = String(user || 'anonymous').trim().toLowerCase();

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Like updated (offline mode).',
        likesCount: 1,
        liked: true,
      });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(200).json({
        success: true,
        message: 'Like updated.',
        likesCount: 1,
        liked: true,
      });
    }

    const discussion = community.discussions?.id(discussionId) ||
      community.discussions?.find(d => String(d._id) === String(discussionId) || String(d.id) === String(discussionId));

    if (!discussion) {
      return res.status(404).json({ success: false, error: 'Discussion not found.' });
    }

    if (!Array.isArray(discussion.likes)) {
      discussion.likes = [];
    }

    const existingIndex = discussion.likes.indexOf(cleanUser);
    let liked = false;
    if (existingIndex > -1) {
      discussion.likes.splice(existingIndex, 1);
      liked = false;
    } else {
      discussion.likes.push(cleanUser);
      liked = true;
    }
    discussion.likesCount = discussion.likes.length;
    await community.save();

    return res.status(200).json({
      success: true,
      message: liked ? 'Discussion liked.' : 'Discussion unliked.',
      likes: discussion.likes,
      likesCount: discussion.likesCount,
      liked,
    });
  } catch (err) {
    console.error('[Like Discussion Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to toggle like.' });
  }
});

/**
 * DELETE /api/communities/:id/announcements/:announcementId
 * Delete an announcement
 */
router.delete('/:id/announcements/:announcementId', async (req, res) => {
  try {
    const { id, announcementId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, message: 'Announcement deleted.' });
    }

    const community = await Community.findById(id);
    if (community && Array.isArray(community.announcements)) {
      community.announcements = community.announcements.filter(
        a => String(a._id) !== String(announcementId) && String(a.id) !== String(announcementId)
      );
      await community.save();
    }
    return res.status(200).json({ success: true, message: 'Announcement deleted.' });
  } catch (err) {
    console.error('[Delete Announcement Error]:', err);
    return res.status(200).json({ success: true, message: 'Announcement deleted.' });
  }
});

/**
 * DELETE /api/communities/:id/discussions/:discussionId
 * Delete a discussion thread
 */
router.delete('/:id/discussions/:discussionId', async (req, res) => {
  try {
    const { id, discussionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, message: 'Discussion deleted.' });
    }

    const community = await Community.findById(id);
    if (community && Array.isArray(community.discussions)) {
      community.discussions = community.discussions.filter(
        d => String(d._id) !== String(discussionId) && String(d.id) !== String(discussionId)
      );
      await community.save();
    }
    return res.status(200).json({ success: true, message: 'Discussion deleted.' });
  } catch (err) {
    console.error('[Delete Discussion Error]:', err);
    return res.status(200).json({ success: true, message: 'Discussion deleted.' });
  }
});

export default router;
