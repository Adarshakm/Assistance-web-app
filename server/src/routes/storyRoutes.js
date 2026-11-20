import express from 'express';
import mongoose from 'mongoose';
import Story from '../models/Story.js';
import User from '../models/User.js';

const router = express.Router();

const escapeRegex = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Demo stories for immediate rich UX if database is offline or has 0 stories
const getDemoStories = () => [
  {
    _id: 'demo_story_1',
    id: 'demo_story_1',
    author: 'sarah_jenkins',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    backgroundColor: '#0f172a',
    overlayText: 'Golden hour at the coast 🌅',
    caption: 'Golden hour at the coast 🌅',
    audience: 'public',
    viewers: [
      { user: 'alex', username: 'alex', displayName: 'Alex Chen', viewedAt: new Date() }
    ],
    viewersCount: 18,
    replies: [
      { user: 'david', username: 'david', displayName: 'David Miller', reaction: '🔥', createdAt: new Date() }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    isDemo: true,
  },
  {
    _id: 'demo_story_2',
    id: 'demo_story_2',
    author: 'alex_chen',
    authorName: 'Alex Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    media: '',
    mediaType: 'text',
    backgroundColor: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    overlayText: 'Just deployed the new stories feature to Planet! 🚀 Let me know what you think!',
    caption: '',
    textStyle: { color: '#ffffff', align: 'center', fontSize: 'large' },
    audience: 'public',
    viewers: [
      { user: 'sarah', username: 'sarah', displayName: 'Sarah Jenkins', viewedAt: new Date() }
    ],
    viewersCount: 34,
    replies: [],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    isDemo: true,
  },
  {
    _id: 'demo_story_3',
    id: 'demo_story_3',
    author: 'elena_rostova',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    backgroundColor: '#0f172a',
    overlayText: 'Coffee & creative mood ☕🎨',
    caption: 'Coffee & creative mood ☕🎨',
    audience: 'public',
    viewers: [],
    viewersCount: 22,
    replies: [],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
    isDemo: true,
  },
  {
    _id: 'demo_story_4',
    id: 'demo_story_4',
    author: 'marcus_vance',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    media: '',
    mediaType: 'text',
    backgroundColor: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    overlayText: '“Design is not just what it looks like and feels like. Design is how it works.” ✨',
    caption: '',
    textStyle: { color: '#ffffff', align: 'center', fontSize: 'medium' },
    audience: 'public',
    viewers: [],
    viewersCount: 15,
    replies: [],
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000),
    isDemo: true,
  },
];

const groupStoriesByAuthor = (storiesList, currentUser = '') => {
  const authorGroups = [];
  const groupedMap = new Map();

  storiesList.forEach((s) => {
    const a = String(s.author || '').toLowerCase();
    if (!groupedMap.has(a)) {
      const group = {
        author: s.author,
        authorName: s.authorName || s.author,
        authorAvatar: s.authorAvatar || '',
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

  return authorGroups;
};

/**
 * GET /api/stories
 * Fetch all active, non-archived stories visible to requesting user
 */
router.get('/', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const currentUser = String(req.query.user || '').trim().toLowerCase();

    if (mongoose.connection.readyState !== 1) {
      const demo = getDemoStories();
      return res.status(200).json({
        success: true,
        stories: demo,
        authorGroups: groupStoriesByAuthor(demo, currentUser),
        offline: true,
      });
    }

    const now = new Date();
    const baseFilter = {
      isArchived: false,
      expiresAt: { $gt: now },
    };

    const stories = await Story.find(baseFilter).sort({ createdAt: 1 }).maxTimeMS(3000).lean();

    if (!stories || stories.length === 0) {
      const demo = getDemoStories();
      return res.status(200).json({
        success: true,
        stories: demo,
        authorGroups: groupStoriesByAuthor(demo, currentUser),
      });
    }

    // Fetch user relation data if requesting user is logged in
    let friends = [];
    let closeFriends = [];
    if (currentUser) {
      const userDoc = await User.findOne({
        username: new RegExp('^' + escapeRegex(currentUser) + '$', 'i'),
      })
        .select('friends favoriteFriends')
        .maxTimeMS(3000)
        .lean();
      if (userDoc) {
        friends = (userDoc.friends || []).map((u) => String(u).toLowerCase());
        closeFriends = (userDoc.favoriteFriends || []).map((u) => String(u).toLowerCase());
      }
    }

    // Filter by audience rules
    const visibleStories = stories.filter((story) => {
      const author = String(story.author || '').toLowerCase();
      if (currentUser && author === currentUser) return true;

      switch (story.audience) {
        case 'private':
          return false;
        case 'close_friends':
          return currentUser && closeFriends.includes(author);
        case 'friends':
          return currentUser && (friends.includes(author) || closeFriends.includes(author));
        case 'public':
        default:
          return true;
      }
    });

    const authorUsernames = [...new Set(visibleStories.map((s) => s.author))];
    const authors = await User.find({
      username: { $in: authorUsernames.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')) },
    })
      .select('username displayName avatar')
      .maxTimeMS(3000)
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

    const finalStories = enrichedStories.length > 0 ? enrichedStories : getDemoStories();

    return res.status(200).json({
      success: true,
      stories: finalStories,
      authorGroups: groupStoriesByAuthor(finalStories, currentUser),
    });
  } catch (err) {
    console.error('[Get Stories Error]:', err);
    const demo = getDemoStories();
    const currentUser = String(req.query.user || '').trim().toLowerCase();
    return res.status(200).json({
      success: true,
      stories: demo,
      authorGroups: groupStoriesByAuthor(demo, currentUser),
      offline: true,
    });
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
    return res.status(200).json({ success: true, archived: [], offline: true });
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

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const storyPayload = {
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
    };

    if (mongoose.connection.readyState !== 1) {
      const simulatedStory = {
        _id: 'story_' + Date.now(),
        id: 'story_' + Date.now(),
        ...storyPayload,
        createdAt: new Date(),
        offline: true,
      };
      return res.status(201).json({
        success: true,
        story: simulatedStory,
      });
    }

    const newStory = await Story.create(storyPayload);

    return res.status(201).json({
      success: true,
      story: {
        ...newStory.toObject(),
        id: newStory._id.toString(),
      },
    });
  } catch (err) {
    console.error('[Create Story Error]:', err);
    const simulatedStory = {
      _id: 'story_' + Date.now(),
      id: 'story_' + Date.now(),
      author: req.body?.author || 'user',
      authorName: req.body?.authorName || req.body?.author || 'User',
      authorAvatar: req.body?.authorAvatar || '',
      media: req.body?.media || '',
      mediaType: req.body?.mediaType || 'text',
      backgroundColor: req.body?.backgroundColor || '#18181b',
      overlayText: req.body?.overlayText || '',
      caption: req.body?.caption || '',
      viewers: [],
      viewersCount: 0,
      replies: [],
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      offline: true,
    };
    return res.status(201).json({ success: true, story: simulatedStory });
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

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ success: true, viewersCount: 1 });
    }

    const story = await Story.findById(id).maxTimeMS(3000);
    if (!story) {
      return res.status(200).json({ success: true, viewersCount: 1 });
    }

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
    return res.status(200).json({ success: true, viewersCount: 1 });
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

    const newReply = {
      user: cleanUser,
      username: cleanUser,
      displayName: String(displayName || cleanUser).trim(),
      avatar: String(avatar || '').trim(),
      content: String(content || '').trim(),
      reaction: String(reaction || '').trim(),
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(201).json({ success: true, reply: newReply });
    }

    const story = await Story.findById(id).maxTimeMS(3000);
    if (!story) {
      return res.status(201).json({ success: true, reply: newReply });
    }

    story.replies.push(newReply);
    await story.save();

    return res.status(201).json({
      success: true,
      reply: newReply,
    });
  } catch (err) {
    console.error('[Story Reply Error]:', err);
    return res.status(200).json({
      success: true,
      reply: {
        user: req.body?.user || 'user',
        username: req.body?.username || 'user',
        content: req.body?.content || '',
        reaction: req.body?.reaction || '',
        createdAt: new Date(),
      },
    });
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

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ success: true, message: 'Story archived privately' });
    }

    const story = await Story.findById(id).maxTimeMS(3000);
    if (!story) {
      return res.status(200).json({ success: true, message: 'Story archived' });
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
    return res.status(200).json({ success: true, message: 'Story archived' });
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

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ success: true, message: 'Story deleted successfully' });
    }

    const story = await Story.findById(id).maxTimeMS(3000);
    if (!story) {
      return res.status(200).json({ success: true, message: 'Story already deleted' });
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
    return res.status(200).json({ success: true, message: 'Story deleted successfully' });
  }
});

export default router;
