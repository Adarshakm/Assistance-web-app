import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * Escape regex special characters
 */
const escapeRegex = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * GET /api/posts
 * Fetch posts for "What's Happening Around You" or "People I Follow" feed
 * Query params:
 *   - feed: 'following' (filters by authors followed by user + user's own posts)
 *   - user: username of current user (used with feed=following)
 *   - authors: comma-separated list of author usernames to filter by
 *   - limit: max posts to fetch (default 50)
 */
router.get('/', async (req, res) => {
  try {
    // Disable any HTTP / browser caching for real-time live feed sync across devices
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));

    let filter = {};

    if (req.query.feed === 'friends' && req.query.user) {
      const cleanUser = String(req.query.user).trim();
      const currentUserDoc = await User.findOne({
        username: new RegExp('^' + escapeRegex(cleanUser) + '$', 'i'),
      })
        .select('friends followers following')
        .lean();

      const explicitFriends = currentUserDoc && Array.isArray(currentUserDoc.friends)
        ? currentUserDoc.friends
        : [];
      const followers = currentUserDoc && Array.isArray(currentUserDoc.followers)
        ? currentUserDoc.followers.map((u) => String(u).toLowerCase())
        : [];
      const following = currentUserDoc && Array.isArray(currentUserDoc.following)
        ? currentUserDoc.following.map((u) => String(u).toLowerCase())
        : [];
      const mutuals = following.filter((u) => followers.includes(u));

      // Authors who are friends (or mutual follows), plus the user themselves
      const authorList = [...new Set([
        ...explicitFriends.map((u) => String(u).trim()),
        ...mutuals,
        cleanUser,
      ])].filter(Boolean);

      filter = {
        author: {
          $in: authorList.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')),
        },
      };
    } else if (req.query.feed === 'following' && req.query.user) {
      const cleanUser = String(req.query.user).trim();
      const currentUserDoc = await User.findOne({
        username: new RegExp('^' + escapeRegex(cleanUser) + '$', 'i'),
      })
        .select('following')
        .lean();

      const following = currentUserDoc && Array.isArray(currentUserDoc.following)
        ? currentUserDoc.following
        : [];

      // Include authors followed by the user, plus the user's own posts
      const authorList = [...new Set([...following.map((u) => String(u).trim()), cleanUser])].filter(Boolean);

      filter = {
        author: {
          $in: authorList.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')),
        },
      };
    } else if (req.query.authors) {
      const authorList = req.query.authors.split(',').map((s) => s.trim()).filter(Boolean);
      if (authorList.length > 0) {
        filter = {
          author: {
            $in: authorList.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')),
          },
        };
      }
    }

    const rawPosts = await Post.find(filter).sort({ createdAt: -1 }).limit(limit).lean();

    // Collect unique author usernames to fetch latest avatars & display names
    const authors = [...new Set(rawPosts.map((p) => p.author).filter(Boolean))];
    const users = await User.find({
      username: { $in: authors.map((a) => new RegExp('^' + escapeRegex(a) + '$', 'i')) },
    })
      .select('username displayName avatar')
      .lean();

    const userMap = new Map();
    users.forEach((u) => {
      userMap.set(u.username.toLowerCase(), u);
    });

    const posts = rawPosts.map((p) => {
      const user = userMap.get(String(p.author).toLowerCase());
      return {
        id: p._id.toString(),
        author: p.author,
        authorName: (user && user.displayName) || p.authorName || p.author,
        authorAvatar: (user && user.avatar) || p.authorAvatar || '',
        content: p.content,
        media: p.media || '',
        likes: p.likes || [],
        likesCount: (p.likes || []).length,
        time: p.time || new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEdited: p.isEdited || false,
        editedAt: p.editedAt || null,
        createdAt: p.createdAt,
      };
    });

    return res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error('[Post Route Error - GET /]:', err);
    return res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
  }
});

/**
 * POST /api/posts
 * Create a new post in "What's Happening Around You"
 */
router.post('/', async (req, res) => {
  try {
    const { author, content, authorName, authorAvatar, media = '' } = req.body || {};

    const rawAuthor = (author && String(author).trim()) || (authorName && String(authorName).trim()) || 'User';
    const cleanAuthor = rawAuthor.toLowerCase();
    const cleanContent = String(content || '').trim();

    if (!cleanContent) {
      return res.status(400).json({ success: false, error: 'Post content cannot be empty' });
    }

    // Look up author info if not provided
    let finalAuthorName = (authorName && String(authorName).trim()) || rawAuthor;
    // Discard oversized base64 avatars from payload to prevent bloated DB records & 413s
    let finalAuthorAvatar = (authorAvatar && typeof authorAvatar === 'string' && authorAvatar.length < 50000) ? authorAvatar : '';

    const u = await User.findOne({ username: { $regex: '^' + escapeRegex(cleanAuthor) + '$', $options: 'i' } })
      .select('displayName avatar username')
      .lean();
    if (u) {
      if (!authorName || finalAuthorName.toLowerCase() === cleanAuthor) {
        finalAuthorName = u.displayName || u.username || rawAuthor;
      }
      if (!finalAuthorAvatar && u.avatar) {
        finalAuthorAvatar = u.avatar;
      }
    }

    const newPost = new Post({
      author: cleanAuthor,
      authorName: finalAuthorName,
      authorAvatar: finalAuthorAvatar,
      content: cleanContent,
      media: media || '',
      likes: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    await newPost.save();

    console.log(`[Post Created] New post by @${cleanAuthor}: "${cleanContent.slice(0, 30)}..."`);

    return res.status(201).json({
      success: true,
      post: {
        id: newPost._id.toString(),
        author: newPost.author,
        authorName: newPost.authorName,
        authorAvatar: newPost.authorAvatar,
        content: newPost.content,
        media: newPost.media,
        likes: newPost.likes,
        likesCount: 0,
        time: newPost.time,
        createdAt: newPost.createdAt,
      },
    });
  } catch (err) {
    console.error('[Post Route Error - POST /]:', err);
    return res.status(500).json({ success: false, error: 'Failed to create post', details: err.message });
  }
});

/**
 * POST /api/posts/:id/like
 * Toggle like on a post
 */
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const rawUser = req.body.username;
    if (!rawUser) {
      return res.status(400).json({ error: 'Username is required to like a post' });
    }

    const cleanUser = String(rawUser).trim().toLowerCase();
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const index = post.likes.indexOf(cleanUser);
    let isLiked = false;
    if (index > -1) {
      post.likes.splice(index, 1);
      isLiked = false;
    } else {
      post.likes.push(cleanUser);
      isLiked = true;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      likes: post.likes,
      likesCount: post.likes.length,
      isLiked,
    });
  } catch (err) {
    console.error('[Post Route Error - Like]:', err);
    return res.status(500).json({ error: 'Failed to toggle like', details: err.message });
  }
});

/**
 * PUT /api/posts/:id
 * Edit an existing post
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, user, username } = req.body || {};
    const rawUser = user || username;

    if (!content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: 'Post content cannot be empty' });
    }

    if (!rawUser) {
      return res.status(401).json({ success: false, error: 'User must be logged in to edit post' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    const cleanUser = String(rawUser).trim().toLowerCase();
    if (post.author !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Not authorized to edit this post' });
    }

    post.content = String(content).trim();
    post.isEdited = true;
    post.editedAt = new Date();

    await post.save();

    console.log(`[Post Edited] Post ${id} updated by @${cleanUser}`);

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post: {
        id: post._id.toString(),
        author: post.author,
        authorName: post.authorName,
        authorAvatar: post.authorAvatar,
        content: post.content,
        media: post.media,
        likes: post.likes,
        likesCount: (post.likes || []).length,
        time: post.time,
        isEdited: post.isEdited,
        editedAt: post.editedAt,
        createdAt: post.createdAt,
      },
    });
  } catch (err) {
    console.error('[Post Route Error - PUT /:id]:', err);
    return res.status(500).json({ success: false, error: 'Failed to update post', details: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  // Delegate to PUT handler
  req.method = 'PUT';
  router.handle(req, res);
});

/**
 * DELETE /api/posts/:id
 * Delete a post
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rawUser = req.query.user || req.body.user;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (rawUser && post.author !== String(rawUser).trim().toLowerCase()) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error('[Post Route Error - DELETE]:', err);
    return res.status(500).json({ error: 'Failed to delete post', details: err.message });
  }
});

export default router;

