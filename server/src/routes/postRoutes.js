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

    const searchQuery = String(req.query.search || req.query.q || '').trim();
    if (searchQuery) {
      const cleanQ = searchQuery.replace(/^@/, '').trim();
      const searchRegex = new RegExp(escapeRegex(searchQuery), 'i');
      const cleanRegex = new RegExp(escapeRegex(cleanQ), 'i');
      const searchOr = [
        { content: searchRegex },
        { author: cleanRegex },
        { authorName: cleanRegex },
      ];
      if (filter.author) {
        filter = {
          $and: [
            { author: filter.author },
            { $or: searchOr },
          ],
        };
      } else {
        filter.$or = searchOr;
      }
    }

    const rawPosts = await Post.find(filter).sort({ createdAt: -1 }).limit(limit).lean();

    // Collect unique author usernames to fetch latest avatars & display names
    const authors = [
      ...new Set([
        ...rawPosts.map((p) => p.author),
        ...rawPosts.flatMap((p) => (p.comments || []).map((c) => c.author)),
      ].filter(Boolean)),
    ];
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
      const isVideo = Boolean(
        p.video ||
        p.mediaType === 'video' ||
        (p.media && (p.media.startsWith('data:video') || p.media.endsWith('.mp4') || p.media.endsWith('.webm') || p.media.endsWith('.mov')))
      );
      const mediaPayload = isVideo ? (p.video || p.media || '') : (p.image || p.media || '');
      const comments = Array.isArray(p.comments)
        ? p.comments.map((c) => {
            const commentUser = userMap.get(String(c.author).toLowerCase());
            return {
              id: c._id ? c._id.toString() : c.id,
              author: c.author,
              authorName: (commentUser && commentUser.displayName) || c.authorName || c.author,
              authorAvatar: (commentUser && commentUser.avatar) || c.authorAvatar || '',
              content: c.content,
              createdAt: c.createdAt,
              time: c.createdAt
                ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : '',
            };
          })
        : [];

      return {
        id: p._id.toString(),
        author: p.author,
        authorName: (user && user.displayName) || p.authorName || p.author,
        authorAvatar: (user && user.avatar) || p.authorAvatar || '',
        content: p.content,
        media: mediaPayload,
        image: !isVideo ? mediaPayload : '',
        video: isVideo ? mediaPayload : '',
        mediaType: p.mediaType || (isVideo ? 'video' : mediaPayload ? 'image' : ''),
        likes: p.likes || [],
        likesCount: (p.likes || []).length,
        comments,
        commentsCount: comments.length,
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
 * Create a new post in feeds (text, image, and/or video)
 */
router.post('/', async (req, res) => {
  try {
    const { author, content, authorName, authorAvatar, media = '', image = '', video = '', mediaType = '' } = req.body || {};

    const rawAuthor = (author && String(author).trim()) || (authorName && String(authorName).trim()) || 'User';
    const cleanAuthor = rawAuthor.toLowerCase();
    const cleanContent = String(content || '').trim();

    let finalVideo = String(video || '').trim();
    let finalImage = String(image || '').trim();
    let finalMedia = String(media || '').trim();
    let finalMediaType = String(mediaType || '').trim();

    if (!finalVideo && (finalMediaType === 'video' || (finalMedia && (finalMedia.startsWith('data:video') || finalMedia.endsWith('.mp4') || finalMedia.endsWith('.webm') || finalMedia.endsWith('.mov'))))) {
      finalVideo = finalMedia;
      finalMediaType = 'video';
    }
    if (!finalImage && (finalMediaType === 'image' || (!finalVideo && finalMedia))) {
      finalImage = finalMedia;
      if (!finalMediaType) finalMediaType = 'image';
    }
    if (!finalMedia) {
      finalMedia = finalVideo || finalImage || '';
    }
    if (!finalMediaType) {
      finalMediaType = finalVideo ? 'video' : finalImage ? 'image' : '';
    }

    if (!cleanContent && !finalMedia && !finalImage && !finalVideo) {
      return res.status(400).json({ success: false, error: 'Post must contain text, an image, or a video' });
    }

    // Look up author info if not provided
    let finalAuthorName = (authorName && String(authorName).trim()) || rawAuthor;
    // Discard oversized base64 avatars from payload to prevent bloated DB records & 413s
    let finalAuthorAvatar = (authorAvatar && typeof authorAvatar === 'string' && authorAvatar.length < 50000) ? authorAvatar : '';

    const u = await User.findOne({ username: { $regex: '^' + escapeRegex(cleanAuthor) + '$', $options: 'i' } })
      .select('displayName avatar username')
      .maxTimeMS(3000)
      .lean()
      .catch(() => null);
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
      media: finalMedia,
      image: finalImage,
      video: finalVideo,
      mediaType: finalMediaType,
      likes: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    await newPost.save();

    console.log(`[Post Created] New post by @${cleanAuthor}: "${cleanContent.slice(0, 30)}..." [type: ${finalMediaType || 'text'}]`);

    return res.status(201).json({
      success: true,
      post: {
        id: newPost._id.toString(),
        author: newPost.author,
        authorName: newPost.authorName,
        authorAvatar: newPost.authorAvatar,
        content: newPost.content,
        media: newPost.media,
        image: newPost.image,
        video: newPost.video,
        mediaType: newPost.mediaType,
        likes: newPost.likes,
        likesCount: 0,
        comments: [],
        commentsCount: 0,
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
 * Edit an existing post (content, image, and/or video)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, media, image, video, mediaType, user, username } = req.body || {};
    const rawUser = user || username;

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

    if (content !== undefined) {
      post.content = String(content || '').trim();
    }
    if (video !== undefined) {
      post.video = String(video || '').trim();
    }
    if (image !== undefined) {
      post.image = String(image || '').trim();
    }
    if (media !== undefined) {
      post.media = String(media || '').trim();
    }
    if (mediaType !== undefined) {
      post.mediaType = String(mediaType || '').trim();
    } else if (post.video) {
      post.mediaType = 'video';
    } else if (post.image) {
      post.mediaType = 'image';
    }
    if (!post.media) {
      post.media = post.video || post.image || '';
    }

    if (!post.content && !post.media && !post.image && !post.video) {
      return res.status(400).json({ success: false, error: 'Post must contain text, an image, or a video' });
    }

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
        image: post.image,
        video: post.video,
        mediaType: post.mediaType,
        likes: post.likes,
        likesCount: (post.likes || []).length,
        comments: (post.comments || []).map((c) => ({
          id: c._id ? c._id.toString() : c.id,
          author: c.author,
          authorName: c.authorName || c.author,
          authorAvatar: c.authorAvatar || '',
          content: c.content,
          createdAt: c.createdAt,
          time: c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        })),
        commentsCount: (post.comments || []).length,
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

/**
 * POST /api/posts/:id/comments
 * Add a comment to a post
 */
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author, authorName, authorAvatar, username } = req.body || {};
    const rawAuthor = author || username || 'User';
    const cleanAuthor = String(rawAuthor).trim().toLowerCase();
    const cleanContent = String(content || '').trim();

    if (!cleanContent) {
      return res.status(400).json({ success: false, error: 'Comment content cannot be empty' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Look up author info to get latest displayName and avatar
    let finalAuthorName = (authorName && String(authorName).trim()) || rawAuthor;
    let finalAuthorAvatar = (authorAvatar && typeof authorAvatar === 'string' && authorAvatar.length < 50000) ? authorAvatar : '';

    const u = await User.findOne({ username: { $regex: '^' + escapeRegex(cleanAuthor) + '$', $options: 'i' } })
      .select('displayName avatar username')
      .maxTimeMS(3000)
      .lean()
      .catch(() => null);
    if (u) {
      if (!authorName || finalAuthorName.toLowerCase() === cleanAuthor) {
        finalAuthorName = u.displayName || u.username || rawAuthor;
      }
      if (!finalAuthorAvatar && u.avatar) {
        finalAuthorAvatar = u.avatar;
      }
    }

    const commentDoc = {
      author: cleanAuthor,
      authorName: finalAuthorName,
      authorAvatar: finalAuthorAvatar,
      content: cleanContent,
      createdAt: new Date(),
    };

    if (!Array.isArray(post.comments)) {
      post.comments = [];
    }

    post.comments.push(commentDoc);
    await post.save();

    const savedComment = post.comments[post.comments.length - 1];

    console.log(`[Comment Added] Comment on post ${id} by @${cleanAuthor}: "${cleanContent.slice(0, 30)}..."`);

    return res.status(201).json({
      success: true,
      comment: {
        id: savedComment._id.toString(),
        author: savedComment.author,
        authorName: savedComment.authorName,
        authorAvatar: savedComment.authorAvatar,
        content: savedComment.content,
        createdAt: savedComment.createdAt,
        time: new Date(savedComment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      commentsCount: post.comments.length,
    });
  } catch (err) {
    console.error('[Post Route Error - POST /:id/comments]:', err);
    return res.status(500).json({ success: false, error: 'Failed to add comment', details: err.message });
  }
});

/**
 * DELETE /api/posts/:postId/comments/:commentId
 * Delete a comment from a post
 */
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const rawUser = req.query.user || req.body.user || req.query.username || req.body.username;
    const cleanUser = rawUser ? String(rawUser).trim().toLowerCase() : '';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    if (!Array.isArray(post.comments)) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    const comment = post.comments.id ? post.comments.id(commentId) : post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    // Check authorization: must be comment author or post author
    if (cleanUser && comment.author !== cleanUser && post.author !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this comment' });
    }

    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
    await post.save();

    console.log(`[Comment Deleted] Comment ${commentId} on post ${postId} deleted by @${cleanUser || 'user'}`);

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      commentsCount: post.comments.length,
    });
  } catch (err) {
    console.error('[Post Route Error - DELETE /:postId/comments/:commentId]:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete comment', details: err.message });
  }
});

export default router;

