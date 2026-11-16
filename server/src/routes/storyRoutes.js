import express from 'express';
import Story from '../models/Story.js';
import User from '../models/User.js';

const router = express.Router();

const escapeRegex = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * GET /api/stories
 * Fetch all active, non-archived stories visible to requesting user
 */
router.get('/', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const currentUser = String(req.query.user || '').trim().toLowerCase();

    const now = new Date();
    // Only active, non-expired, non-archived stories
    const baseFilter = {
      isArchived: false,
      expiresAt: { $gt: now },
    };

    const stories = await Story.find(baseFilter).sort({ createdAt: 1 }).lean();

    // Fetch user relation data if requesting user is logged in
    let friends = [];
    let closeFriends = [];
    if (currentUser) {
      const userDoc = await User.findOne({
        username: new RegExp('^' + escapeRegex(currentUser) + '$', 'i'),
      })
        .select('friends favoriteFriends')
        .lean();
      if (userDoc) {
        friends = (userDoc.friends || []).map((u) => String(u).toLowerCase());
        closeFriends = (userDoc.favoriteFriends || []).map((u) => String(u).toLowerCase());
      }
    }

    // Filter by audience rules
    const visibleStories = stories.filter((story) => {
      const author = String(story.author || '').toLowerCase();
      if (currentUser && author === currentUser) return true; // Author sees all their own stories

      switch (story.audience) {
        case 'private':
          return false; // Only author
        case 'close_friends':
          return currentUser && closeFriends.includes(author);
        case 'friends':
          return currentUser && (friends.includes(author) || closeFriends.includes(author));
        case 'public':
        default:
          return true; // Anyone
      }
    });

    // Populate latest avatars if available
    const authorUsernames = [...new Set(visibleStories.map((s) => s.author))];
    const authors = await User.find({
      username: { $in: authorUsernames.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')) },
    })
      .select('username displayName avatar')
      .lean();

    const authorMap = new Map();
    authors.forEach((a) => authorMap.set(a.username.toLowerCase(), a));

    const enrichedStories = visibleStories.map((s) => {
      const u = authorMap.get(String(s.author).toLowerCase());
      return {
        ...s,
        id: s._id.toString(),
        authorName: (u && u.displayName) || s.authorName || s.author,
        authorAvatar: (u && u.avatar) || s.authorAvatar || '',
      };
    });

    // Group stories by author for the story carousel tray
    const authorGroups = [];
    const groupedMap = new Map();

    enrichedStories.forEach((s) => {
      const a = s.author.toLowerCase();
      if (!groupedMap.has(a)) {
        const group = {
          author: s.author,
          authorName: s.authorName,
          authorAvatar: s.authorAvatar,
          hasUnseen: !currentUser || !(s.viewers || []).some((v) => String(v.user).toLowerCase() === currentUser),
          latestCreatedAt: s.createdAt,
          stories: [],
        };
        groupedMap.set(a, group);
        authorGroups.push(group);
      }
      const group = groupedMap.get(a);
      group.stories.push(s);
      if (!group.hasUnseen && (!currentUser || !(s.viewers || []).some((v) => String(v.user).toLowerCase() === currentUser))) {
        group.hasUnseen = true;
      }
    });

    return res.status(200).json({
      success: true,
      stories: enrichedStories,
      authorGroups,
    });
  } catch (err) {
    console.error('[Get Stories Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch stories' });
  }
});

/**
 * GET /api/stories/archive
 * Fetch privately archived or expired stories for author
 */
router.get('/archive', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const currentUser = String(req.query.user || '').trim().toLowerCase();
    if (!currentUser) {
      return res.status(400).json({ success: false, error: 'User is required to view story archive' });
    }

    const now = new Date();
    // Stories created by user that are either archived OR expired
    const filter = {
      author: new RegExp('^' + escapeRegex(currentUser) + '$', 'i'),
      $or: [{ isArchived: true }, { expiresAt: { $lte: now } }],
    };

    const archived = await Story.find(filter).sort({ createdAt: -1 }).lean();

    const formatted = archived.map((s) => ({
      ...s,
      id: s._id.toString(),
    }));

    return res.status(200).json({
      success: true,
      archived: formatted,
    });
  } catch (err) {
    console.error('[Get Story Archive Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch story archive' });
  }
});

/**
 * POST /api/stories
 * Create a new story
 */
router.post('/', async (req, res) => {
  try {
    const {
      author,
      authorName = '',
      authorAvatar = '',
      media = '',
      mediaType = 'image',
      backgroundColor = '#18181b',
      overlayText = '',
      textStyle = {},
      caption = '',
      stickers = [],
      mentions = [],
      link = { url: '', title: '' },
      audience = 'public',
    } = req.body || {};

    const cleanAuthor = String(author || '').trim().toLowerCase();
    if (!cleanAuthor) {
      return res.status(400).json({ success: false, error: 'Author is required' });
    }

    if (!media && !overlayText) {
      return res.status(400).json({ success: false, error: 'Story must contain media or overlay text' });
    }

    // Auto-expire after 24 hours
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newStory = await Story.create({
      author: cleanAuthor,
      authorName: String(authorName || cleanAuthor).trim(),
      authorAvatar: String(authorAvatar || '').trim(),
      media: String(media || ''),
      mediaType: ['image', 'video', 'text'].includes(mediaType) ? mediaType : 'image',
      backgroundColor: String(backgroundColor || '#18181b'),
      overlayText: String(overlayText || '').trim(),
      textStyle: {
        color: textStyle.color || '#ffffff',
        background: textStyle.background || 'transparent',
        align: textStyle.align || 'center',
        fontSize: textStyle.fontSize || 'medium',
        fontFamily: textStyle.fontFamily || 'sans',
      },
      caption: String(caption || '').trim(),
      stickers: Array.isArray(stickers) ? stickers : [],
      mentions: Array.isArray(mentions) ? mentions.map((m) => String(m).trim().toLowerCase()) : [],
      link: {
        url: String(link?.url || '').trim(),
        title: String(link?.title || '').trim(),
      },
      audience: ['public', 'friends', 'close_friends', 'private'].includes(audience) ? audience : 'public',
      viewers: [],
      viewersCount: 0,
      replies: [],
      isArchived: false,
      expiresAt,
    });

    return res.status(201).json({
      success: true,
      story: {
        ...newStory.toObject(),
        id: newStory._id.toString(),
      },
    });
  } catch (err) {
    console.error('[Create Story Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to create story' });
  }
});

/**
 * POST /api/stories/:id/view
 * Register a story view
 */
router.post('/:id/view', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, username, displayName, avatar } = req.body || {};
    const cleanUser = String(user || username || '').trim().toLowerCase();

    if (!cleanUser) {
      return res.status(400).json({ success: false, error: 'Viewer username is required' });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    // Do not register author viewing their own story as a viewer
    if (story.author.toLowerCase() === cleanUser) {
      return res.status(200).json({ success: true, viewersCount: story.viewersCount });
    }

    const alreadyViewed = (story.viewers || []).some(
      (v) => String(v.user).toLowerCase() === cleanUser
    );

    if (!alreadyViewed) {
      story.viewers.push({
        user: cleanUser,
        username: cleanUser,
        displayName: String(displayName || cleanUser).trim(),
        avatar: String(avatar || '').trim(),
        viewedAt: new Date(),
      });
      story.viewersCount = story.viewers.length;
      await story.save();
    }

    return res.status(200).json({
      success: true,
      viewersCount: story.viewersCount,
    });
  } catch (err) {
    console.error('[Story View Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to register story view' });
  }
});

/**
 * POST /api/stories/:id/reply
 * Send a reply or emoji reaction to a story
 */
router.post('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, username, displayName, avatar, content = '', reaction = '' } = req.body || {};
    const cleanUser = String(user || username || '').trim().toLowerCase();

    if (!cleanUser) {
      return res.status(400).json({ success: false, error: 'User is required to reply' });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    const newReply = {
      user: cleanUser,
      username: cleanUser,
      displayName: String(displayName || cleanUser).trim(),
      avatar: String(avatar || '').trim(),
      content: String(content || '').trim(),
      reaction: String(reaction || '').trim(),
      createdAt: new Date(),
    };

    story.replies.push(newReply);
    await story.save();

    return res.status(201).json({
      success: true,
      reply: newReply,
    });
  } catch (err) {
    console.error('[Story Reply Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to post story reply' });
  }
});

/**
 * POST /api/stories/:id/archive
 * Move story to private archive
 */
router.post('/:id/archive', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body || {};
    const cleanUser = String(user || '').trim().toLowerCase();

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    if (cleanUser && story.author.toLowerCase() !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Only the story author can archive it' });
    }

    story.isArchived = true;
    await story.save();

    return res.status(200).json({
      success: true,
      message: 'Story archived privately',
    });
  } catch (err) {
    console.error('[Archive Story Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to archive story' });
  }
});

/**
 * DELETE /api/stories/:id
 * Delete a story
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cleanUser = String(req.query.user || '').trim().toLowerCase();

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    if (cleanUser && story.author.toLowerCase() !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Only the story author can delete it' });
    }

    await Story.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Story deleted successfully',
    });
  } catch (err) {
    console.error('[Delete Story Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete story' });
  }
});

export default router;
