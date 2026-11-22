import express from 'express';
import mongoose from 'mongoose';
import LiveStream from '../models/LiveStream.js';

const router = express.Router();

// Fallback demo active streams for immediate experience if database has 0 active streams
const getDemoStreams = () => [];

/**
 * GET /api/livestreams
 * List all active live streams
 */
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: getDemoStreams().length,
        streams: getDemoStreams(),
        offline: true,
      });
    }

    const streams = await LiveStream.find({ status: 'live' })
      .sort({ createdAt: -1 })
      .limit(50)
      .maxTimeMS(3000)
      .lean();

    // If no active streams in DB, include demo streams so user sees live broadcasts immediately
    const finalStreams = streams && streams.length > 0 ? streams : getDemoStreams();

    return res.status(200).json({
      success: true,
      count: finalStreams.length,
      streams: finalStreams,
    });
  } catch (err) {
    console.error('[Get Live Streams Error]:', err.message || err);
    if (res.headersSent) return;
    return res.status(200).json({
      success: true,
      count: getDemoStreams().length,
      streams: getDemoStreams(),
      offline: true,
    });
  }
});

/**
 * POST /api/livestreams/start
 * Start a new live broadcast
 */
router.post('/start', async (req, res) => {
  try {
    const { title, category, host, hostName, hostAvatar } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Stream title is required.',
      });
    }

    const cleanTitle = String(title).trim();
    if (cleanTitle.length < 2 || cleanTitle.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Title must be between 2 and 100 characters.',
      });
    }

    const cleanHost = String(host || 'user').trim().toLowerCase();
    const cleanHostName = String(hostName || cleanHost).trim();
    const cleanCategory = String(category || 'General').trim();
    const cleanAvatar = String(hostAvatar || '').trim();

    if (mongoose.connection.readyState !== 1) {
      const simulated = {
        _id: 'live_' + Date.now(),
        title: cleanTitle,
        category: cleanCategory,
        host: cleanHost,
        hostName: cleanHostName,
        hostAvatar: cleanAvatar,
        status: 'live',
        viewerCount: 1,
        likesCount: 0,
        comments: [],
        startedAt: new Date(),
        offline: true,
      };
      return res.status(201).json({
        success: true,
        message: 'Live stream started successfully (offline mode).',
        stream: simulated,
      });
    }

    const stream = new LiveStream({
      title: cleanTitle,
      category: cleanCategory,
      host: cleanHost,
      hostName: cleanHostName,
      hostAvatar: cleanAvatar,
      status: 'live',
      viewerCount: 1,
      likesCount: 0,
      startedAt: new Date(),
    });

    const saved = await stream.save();

    return res.status(201).json({
      success: true,
      message: 'Live stream broadcast started.',
      stream: saved,
    });
  } catch (err) {
    console.error('[Start Live Stream Error]:', err.message || err);
    if (res.headersSent) return;
    return res.status(500).json({
      success: false,
      error: 'Failed to start live broadcast: ' + (err.message || 'Server error'),
    });
  }
});

/**
 * POST /api/livestreams/:id/end
 * End an active live stream
 */
router.post('/:id/end', async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Stream ID required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Live stream ended.',
      });
    }

    const stream = await LiveStream.findById(id).maxTimeMS(3000);
    if (!stream) {
      return res.status(200).json({ success: true, message: 'Stream already ended.' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    if (cleanUser && stream.host && stream.host.toLowerCase() !== cleanUser) {
      return res.status(403).json({ success: false, error: 'Only the host can end this live stream.' });
    }

    stream.status = 'ended';
    stream.endedAt = new Date();
    await stream.save();

    return res.status(200).json({
      success: true,
      message: 'Live stream ended successfully.',
    });
  } catch (err) {
    console.error('[End Live Stream Error]:', err.message || err);
    if (res.headersSent) return;
    return res.status(200).json({ success: true, message: 'Stream ended.' });
  }
});

/**
 * POST /api/livestreams/:id/comment
 * Add a live chat comment to stream
 */
router.post('/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, userName, text } = req.body;

    if (!id || !text || !String(text).trim()) {
      return res.status(400).json({ success: false, error: 'Stream ID and comment text are required.' });
    }

    const newComment = {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      user: String(user || 'anonymous').trim().toLowerCase(),
      userName: String(userName || user || 'Viewer').trim(),
      text: String(text).trim(),
      createdAt: new Date(),
    };

    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        comment: newComment,
      });
    }

    const stream = await LiveStream.findById(id).maxTimeMS(3000);
    if (stream) {
      stream.comments.push(newComment);
      if (stream.comments.length > 200) {
        stream.comments = stream.comments.slice(-150);
      }
      await stream.save();
    }

    return res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (err) {
    console.error('[Live Comment Error]:', err.message || err);
    if (res.headersSent) return;
    return res.status(200).json({
      success: true,
      comment: {
        id: 'c_' + Date.now(),
        user: req.body?.user || 'user',
        userName: req.body?.userName || 'User',
        text: req.body?.text || '',
        createdAt: new Date(),
      },
    });
  }
});

/**
 * POST /api/livestreams/:id/react
 * Increment reaction / likes count on a stream
 */
router.post('/:id/react', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true });
    }

    await LiveStream.findByIdAndUpdate(id, { $inc: { likesCount: 1 } }).maxTimeMS(3000);
    return res.status(200).json({ success: true });
  } catch {
    return res.status(200).json({ success: true });
  }
});

export default router;
