import express from 'express';
import Call from '../models/Call.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * Escape special regex characters
 */
const escapeRegex = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Normalize a phone number to its last 10 digits
 */
const normalizeDigits = (str = '') => {
  const digits = String(str).replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : digits;
};

/**
 * Resolve all possible aliases (username, phone, email, display name) for a user
 */
const resolveUserAliases = async (identifier = '') => {
  if (!identifier) return [];
  const raw = String(identifier).trim();
  const lowerRaw = raw.toLowerCase();
  const digits = normalizeDigits(raw);

  const aliases = new Set([raw, lowerRaw]);
  if (digits) {
    aliases.add(digits);
  }

  try {
    const escaped = escapeRegex(raw);
    const query = {
      $or: [
        { username: { $regex: '^' + escaped + '$', $options: 'i' } },
        { displayName: { $regex: '^' + escaped + '$', $options: 'i' } },
        { email: { $regex: '^' + escaped + '$', $options: 'i' } },
      ],
    };
    if (digits && digits.length >= 7) {
      query.$or.push({ phone: { $regex: digits } });
    }

    const matchedUsers = await User.find(query)
      .select('username displayName phone email avatar')
      .lean();

    matchedUsers.forEach((u) => {
      if (u.username) aliases.add(u.username.toLowerCase());
      if (u.displayName) aliases.add(u.displayName.toLowerCase());
      if (u.phone) {
        aliases.add(u.phone);
        const norm = normalizeDigits(u.phone);
        if (norm) aliases.add(norm);
      }
      if (u.email) aliases.add(u.email.toLowerCase());
    });
  } catch (err) {
    console.error('[Call Routes - Alias Resolution Error]:', err.message);
  }

  return Array.from(aliases);
};

/**
 * POST /api/call/initiate
 * Initiate a new voice or video call with WebRTC offer
 */
router.post('/initiate', async (req, res) => {
  try {
    const {
      caller,
      callerName,
      callerAvatar,
      recipient,
      recipientName,
      recipientAvatar,
      type = 'voice',
      sdpOffer,
    } = req.body;

    if (!caller || !recipient) {
      return res.status(400).json({ error: 'Caller and recipient are required' });
    }

    const cleanCaller = String(caller).trim().toLowerCase();
    const cleanRecipient = String(recipient).trim().toLowerCase();

    // Prevent calling oneself
    if (cleanCaller === cleanRecipient) {
      return res.status(400).json({ error: 'Cannot call yourself' });
    }

    // Auto-expire / clean up any stale ringing calls for this caller
    await Call.updateMany(
      {
        caller: cleanCaller,
        status: 'ringing',
        createdAt: { $lt: new Date(Date.now() - 30000) },
      },
      { $set: { status: 'missed', endedAt: new Date() } }
    ).catch(() => {});

    // Lookup user details from DB if names or avatars are empty
    let finalCallerName = callerName || cleanCaller;
    let finalCallerAvatar = callerAvatar || '';
    let finalRecipientName = recipientName || cleanRecipient;
    let finalRecipientAvatar = recipientAvatar || '';

    if (!finalCallerAvatar || !callerName) {
      const u1 = await User.findOne({ username: { $regex: '^' + escapeRegex(cleanCaller) + '$', $options: 'i' } })
        .select('displayName avatar username')
        .lean();
      if (u1) {
        if (!callerName) finalCallerName = u1.displayName || u1.username;
        if (!finalCallerAvatar && u1.avatar) finalCallerAvatar = u1.avatar;
      }
    }

    if (!finalRecipientAvatar || !recipientName) {
      const u2 = await User.findOne({
        $or: [
          { username: { $regex: '^' + escapeRegex(cleanRecipient) + '$', $options: 'i' } },
          { phone: { $regex: normalizeDigits(cleanRecipient) || cleanRecipient } },
        ],
      })
        .select('displayName avatar username phone')
        .lean();
      if (u2) {
        if (!recipientName) finalRecipientName = u2.displayName || u2.username;
        if (!finalRecipientAvatar && u2.avatar) finalRecipientAvatar = u2.avatar;
      }
    }

    const newCall = new Call({
      caller: cleanCaller,
      callerName: finalCallerName,
      callerAvatar: finalCallerAvatar,
      recipient: cleanRecipient,
      recipientName: finalRecipientName,
      recipientAvatar: finalRecipientAvatar,
      type: type === 'video' ? 'video' : 'voice',
      status: 'ringing',
      sdpOffer: sdpOffer || null,
      callerCandidates: [],
      recipientCandidates: [],
    });

    await newCall.save();

    console.log(`[Call Initiate] Call ${newCall._id} started from ${cleanCaller} to ${cleanRecipient} (${type})`);

    return res.status(201).json({
      success: true,
      callId: newCall._id,
      call: {
        id: newCall._id,
        caller: newCall.caller,
        callerName: newCall.callerName,
        callerAvatar: newCall.callerAvatar,
        recipient: newCall.recipient,
        recipientName: newCall.recipientName,
        recipientAvatar: newCall.recipientAvatar,
        type: newCall.type,
        status: newCall.status,
        createdAt: newCall.createdAt,
      },
    });
  } catch (err) {
    console.error('[Call Initiate Error]:', err);
    return res.status(500).json({ error: 'Failed to initiate call', details: err.message });
  }
});

/**
 * GET /api/call/incoming
 * Poll for active incoming calls for the specified user
 */
router.get('/incoming', async (req, res) => {
  try {
    const rawUser = req.query.user;
    if (!rawUser) {
      return res.status(400).json({ error: 'User identifier is required' });
    }

    const aliases = await resolveUserAliases(rawUser);

    // Look for any incoming call created within the last 45 seconds that is still ringing
    const recentThreshold = new Date(Date.now() - 45000);

    const incomingCall = await Call.findOne({
      recipient: { $in: aliases },
      status: 'ringing',
      createdAt: { $gte: recentThreshold },
    })
      .sort({ createdAt: -1 })
      .lean();

    // Auto-mark expired ringing calls
    Call.updateMany(
      {
        recipient: { $in: aliases },
        status: 'ringing',
        createdAt: { $lt: recentThreshold },
      },
      { $set: { status: 'missed', endedAt: new Date() } }
    ).catch(() => {});

    if (!incomingCall) {
      return res.status(200).json({ hasIncoming: false });
    }

    return res.status(200).json({
      hasIncoming: true,
      call: {
        id: incomingCall._id,
        caller: incomingCall.caller,
        callerName: incomingCall.callerName,
        callerAvatar: incomingCall.callerAvatar,
        recipient: incomingCall.recipient,
        recipientName: incomingCall.recipientName,
        recipientAvatar: incomingCall.recipientAvatar,
        type: incomingCall.type,
        status: incomingCall.status,
        sdpOffer: incomingCall.sdpOffer,
        createdAt: incomingCall.createdAt,
      },
    });
  } catch (err) {
    console.error('[Call Incoming Error]:', err);
    return res.status(500).json({ error: 'Failed to check incoming calls', details: err.message });
  }
});

/**
 * GET /api/call/poll/:callId
 * Poll call state and retrieve remote ICE candidates & SDP answer
 */
router.get('/poll/:callId', async (req, res) => {
  try {
    const { callId } = req.params;
    const rawUser = req.query.user || '';
    const cleanUser = String(rawUser).trim().toLowerCase();

    const call = await Call.findById(callId).lean();
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    // Auto timeout if call has been ringing for over 60 seconds
    if (call.status === 'ringing') {
      const ageMs = Date.now() - new Date(call.createdAt).getTime();
      if (ageMs > 60000) {
        await Call.findByIdAndUpdate(callId, {
          status: 'missed',
          endedAt: new Date(),
        });
        return res.status(200).json({
          status: 'missed',
          sdpOffer: call.sdpOffer,
          sdpAnswer: null,
          candidates: [],
          duration: 0,
        });
      }
    }

    // Determine which ICE candidates the requester needs
    let remoteCandidates = [];
    const isCaller = cleanUser && (call.caller === cleanUser || (await resolveUserAliases(cleanUser)).includes(call.caller));
    if (isCaller) {
      // Caller needs recipient candidates
      remoteCandidates = call.recipientCandidates || [];
    } else {
      // Recipient needs caller candidates
      remoteCandidates = call.callerCandidates || [];
    }

    return res.status(200).json({
      callId: call._id,
      type: call.type || 'voice',
      status: call.status,
      sdpOffer: call.sdpOffer,
      sdpAnswer: call.sdpAnswer,
      candidates: remoteCandidates,
      duration: call.duration || 0,
      startedAt: call.startedAt,
      endedAt: call.endedAt,
      remoteVideoOff: isCaller ? !!call.recipientVideoOff : !!call.callerVideoOff,
      remoteMuted: isCaller ? !!call.recipientMuted : !!call.callerMuted,
    });
  } catch (err) {
    console.error('[Call Poll Error]:', err);
    return res.status(500).json({ error: 'Failed to poll call', details: err.message });
  }
});

/**
 * POST /api/call/media-state
 * Update camera/microphone mute or video toggle state
 */
router.post('/media-state', async (req, res) => {
  try {
    const { callId, user, isMuted, isVideoOff } = req.body;
    if (!callId) {
      return res.status(400).json({ error: 'Call ID is required' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    const call = await Call.findById(callId);
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    const aliases = cleanUser ? await resolveUserAliases(cleanUser) : [];
    const isCaller = call.caller === cleanUser || aliases.includes(call.caller);

    if (isCaller) {
      if (typeof isMuted === 'boolean') call.callerMuted = isMuted;
      if (typeof isVideoOff === 'boolean') call.callerVideoOff = isVideoOff;
    } else {
      if (typeof isMuted === 'boolean') call.recipientMuted = isMuted;
      if (typeof isVideoOff === 'boolean') call.recipientVideoOff = isVideoOff;
    }

    await call.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update media state', details: err.message });
  }
});

/**
 * POST /api/call/answer
 * Accept an incoming call and attach SDP answer
 */
router.post('/answer', async (req, res) => {
  try {
    const { callId, user, sdpAnswer } = req.body;
    if (!callId) {
      return res.status(400).json({ error: 'Call ID is required' });
    }

    const call = await Call.findById(callId);
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    if (call.status !== 'ringing') {
      return res.status(400).json({
        error: `Cannot answer call in status '${call.status}'`,
        status: call.status,
      });
    }

    call.status = 'connected';
    call.sdpAnswer = sdpAnswer || null;
    call.startedAt = new Date();
    await call.save();

    console.log(`[Call Answer] Call ${callId} connected by ${user}`);

    return res.status(200).json({
      success: true,
      status: 'connected',
      call: {
        id: call._id,
        status: call.status,
        startedAt: call.startedAt,
      },
    });
  } catch (err) {
    console.error('[Call Answer Error]:', err);
    return res.status(500).json({ error: 'Failed to answer call', details: err.message });
  }
});

/**
 * POST /api/call/candidate
 * Submit an ICE candidate (from caller or recipient)
 */
router.post('/candidate', async (req, res) => {
  try {
    const { callId, user, candidate } = req.body;
    if (!callId || !candidate) {
      return res.status(400).json({ error: 'Call ID and candidate are required' });
    }

    const cleanUser = String(user || '').trim().toLowerCase();
    const call = await Call.findById(callId);
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    const aliases = cleanUser ? await resolveUserAliases(cleanUser) : [];
    const isCaller = call.caller === cleanUser || aliases.includes(call.caller);

    if (isCaller) {
      // Append to callerCandidates
      call.callerCandidates.push(candidate);
    } else {
      // Append to recipientCandidates
      call.recipientCandidates.push(candidate);
    }

    await call.save();

    return res.status(200).json({
      success: true,
      isCaller,
      count: isCaller ? call.callerCandidates.length : call.recipientCandidates.length,
    });
  } catch (err) {
    console.error('[Call Candidate Error]:', err);
    return res.status(500).json({ error: 'Failed to add candidate', details: err.message });
  }
});

/**
 * POST /api/call/reject
 * Reject/decline an incoming call
 */
router.post('/reject', async (req, res) => {
  try {
    const { callId, user, reason = 'declined' } = req.body;
    if (!callId) {
      return res.status(400).json({ error: 'Call ID is required' });
    }

    const call = await Call.findById(callId);
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    call.status = reason === 'busy' ? 'busy' : 'rejected';
    call.endedAt = new Date();
    await call.save();

    console.log(`[Call Reject] Call ${callId} ${call.status} by ${user}`);

    return res.status(200).json({ success: true, status: call.status });
  } catch (err) {
    console.error('[Call Reject Error]:', err);
    return res.status(500).json({ error: 'Failed to reject call', details: err.message });
  }
});

/**
 * POST /api/call/end
 * End an ongoing or active call
 */
router.post('/end', async (req, res) => {
  try {
    const { callId, user, duration: reportedDuration } = req.body;
    if (!callId) {
      return res.status(400).json({ error: 'Call ID is required' });
    }

    const call = await Call.findById(callId);
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    if (call.status === 'ended' || call.status === 'rejected') {
      return res.status(200).json({ success: true, status: call.status, duration: call.duration });
    }

    let calculatedDuration = call.duration || 0;
    if (call.startedAt) {
      calculatedDuration = Math.max(0, Math.round((Date.now() - new Date(call.startedAt).getTime()) / 1000));
    } else if (typeof reportedDuration === 'number' && reportedDuration > 0) {
      calculatedDuration = Math.round(reportedDuration);
    }

    call.status = 'ended';
    call.duration = calculatedDuration;
    call.endedAt = new Date();
    await call.save();

    console.log(`[Call End] Call ${callId} ended by ${user} (duration: ${calculatedDuration}s)`);

    return res.status(200).json({
      success: true,
      status: 'ended',
      duration: calculatedDuration,
    });
  } catch (err) {
    console.error('[Call End Error]:', err);
    return res.status(500).json({ error: 'Failed to end call', details: err.message });
  }
});

/**
 * GET /api/call/history
 * Fetch call history for a user
 */
router.get('/history', async (req, res) => {
  try {
    const rawUser = req.query.user;
    if (!rawUser) {
      return res.status(400).json({ error: 'User is required' });
    }

    const aliases = await resolveUserAliases(rawUser);

    const calls = await Call.find({
      $or: [{ caller: { $in: aliases } }, { recipient: { $in: aliases } }],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const formattedCalls = calls.map((c) => {
      const isOutgoing = aliases.includes(c.caller);
      return {
        id: c._id,
        isOutgoing,
        type: c.type,
        status: c.status,
        duration: c.duration || 0,
        contactName: isOutgoing ? c.recipientName || c.recipient : c.callerName || c.caller,
        contactUsername: isOutgoing ? c.recipient : c.caller,
        contactAvatar: isOutgoing ? c.recipientAvatar : c.callerAvatar,
        createdAt: c.createdAt,
        startedAt: c.startedAt,
        endedAt: c.endedAt,
      };
    });

    return res.status(200).json({ success: true, calls: formattedCalls });
  } catch (err) {
    console.error('[Call History Error]:', err);
    return res.status(500).json({ error: 'Failed to fetch call history', details: err.message });
  }
});

/**
 * DELETE /api/call/history/:callId
 * Delete a call record
 */
router.delete('/history/:callId', async (req, res) => {
  try {
    const { callId } = req.params;
    await Call.findByIdAndDelete(callId);
    return res.status(200).json({ success: true, message: 'Call deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete call', details: err.message });
  }
});

export default router;

