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
 * Fetch all posts for "What's Happening Around You" feed
 */
router.get('/', async (req, res) => {
  try {
    // Disable any HTTP / browser caching for real-time live feed sync across devices
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const rawPosts = await Post.find().sort({ createdAt: -1 }).limit(limit).lean();

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

    if (!author || !content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: 'Author and content are required' });
    }

    const cleanAuthor = String(author).trim().toLowerCase();
    const cleanContent = String(content).trim();

    // Look up author info if not provided
    let finalAuthorName = authorName ? String(authorName).trim() : cleanAuthor;
    // Discard oversized base64 avatars from payload to prevent bloated DB records & 413s
    let finalAuthorAvatar = (authorAvatar && typeof authorAvatar === 'string' && authorAvatar.length < 50000) ? authorAvatar : '';

    const u = await User.findOne({ username: { $regex: '^' + escapeRegex(cleanAuthor) + '$', $options: 'i' } })
      .select('displayName avatar username')
      .lean();
    if (u) {
      if (!authorName || finalAuthorName === cleanAuthor) {
        finalAuthorName = u.displayName || u.username || cleanAuthor;
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

