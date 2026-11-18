import express from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
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
 * Generate a regex pattern that matches 10 digits regardless of formatting/spaces/hyphens
 */
const makePhonePattern = (str = '') => {
  const digits = String(str).replace(/\D/g, '');
  if (!digits || digits.length < 5) return null;
  const slice = digits.length >= 10 ? digits.slice(-10) : digits;
  return slice.split('').join('\\D*');
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

  if (mongoose.connection.readyState !== 1) {
    return Array.from(aliases);
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

    const phonePattern = makePhonePattern(raw);
    if (phonePattern) {
      query.$or.push({ phone: { $regex: phonePattern } });
    }

    const matchedUsers = await User.find(query, 'username displayName phone email').lean();
    for (const u of matchedUsers) {
      if (u.username) {
        aliases.add(String(u.username).trim());
        aliases.add(String(u.username).trim().toLowerCase());
      }
      if (u.displayName) {
        aliases.add(String(u.displayName).trim());
        aliases.add(String(u.displayName).trim().toLowerCase());
      }
      if (u.phone) {
        aliases.add(String(u.phone).trim());
        aliases.add(String(u.phone).trim().toLowerCase());
        const uDigits = normalizeDigits(u.phone);
        if (uDigits) aliases.add(uDigits);
      }
      if (u.email) {
        aliases.add(String(u.email).trim().toLowerCase());
      }
    }
  } catch (err) {
    console.warn('[Resolve User Aliases Error]:', err.message);
  }

  return Array.from(aliases);
};

/**
 * Format a message object for frontend consumption
 */
const formatMessage = (msg, userAliases = []) => {
  const senderStr = String(msg?.sender || '').trim().toLowerCase();
  const digits = normalizeDigits(senderStr);
  const isMe =
    Array.isArray(userAliases) && userAliases.length > 0
      ? Boolean(
          userAliases.includes(senderStr) ||
            userAliases.includes(String(msg?.sender || '').trim()) ||
            (digits && userAliases.includes(digits))
        )
      : false;

  return {
    id: msg?._id ? msg._id.toString() : msg?.id || String(Date.now()),
    _id: msg?._id ? msg._id.toString() : undefined,
    sender: msg?.sender || '',
    senderName: msg?.senderName || msg?.sender || '',
    recipient: msg?.recipient || '',
    recipientName: msg?.recipientName || msg?.recipient || '',
    text: msg?.text || '',
    mediaType: msg?.mediaType || 'text',
    mediaUrl: msg?.mediaUrl || '',
    fileName: msg?.fileName || '',
    fileSize: msg?.fileSize || '',
    time:
      msg?.time ||
      (msg?.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    createdAt: msg?.createdAt || new Date(),
    read: !!msg?.read,
    isSent: isMe,
  };
};

/**
 * POST /api/chat/send
 * Send a direct message between sender and recipient (text, image, video, document)
 */
router.post('/send', async (req, res) => {
  try {
    const { sender, senderName, recipient, recipientName, text, mediaType, mediaUrl, fileName, fileSize, autoReply } = req.body;

    const cleanSender = sender ? String(sender).trim().toLowerCase() : '';
    const cleanRecipient = recipient ? String(recipient).trim().toLowerCase() : '';
    const cleanText = text ? String(text).trim() : '';
    const cleanMediaType = mediaType && ['image', 'video', 'document'].includes(mediaType) ? mediaType : 'text';
    const cleanMediaUrl = mediaUrl ? String(mediaUrl) : '';
    const cleanFileName = fileName ? String(fileName).trim() : '';
    const cleanFileSize = fileSize ? String(fileSize).trim() : '';

    if (!cleanSender || !cleanRecipient || (!cleanText && !cleanMediaUrl)) {
      return res.status(400).json({
        success: false,
        error: 'sender, recipient, and either message text or media are required.',
      });
    }

    // Map recipient and sender to registered accounts if matching
    let targetRecipient = cleanRecipient;
    let targetRecipientName = recipientName || cleanRecipient;
    let targetSender = cleanSender;
    let targetSenderName = senderName || cleanSender;

    try {
      const escapedRecipient = escapeRegex(cleanRecipient);
      const rQuery = {
        $or: [
          { username: { $regex: '^' + escapedRecipient + '$', $options: 'i' } },
          { displayName: { $regex: '^' + escapedRecipient + '$', $options: 'i' } },
          { email: { $regex: '^' + escapedRecipient + '$', $options: 'i' } },
        ],
      };
      const rPattern = makePhonePattern(cleanRecipient);
      if (rPattern) {
        rQuery.$or.push({ phone: { $regex: rPattern } });
      }
      const foundRecipient = await User.findOne(rQuery, 'username displayName phone').lean();
      if (foundRecipient && foundRecipient.username) {
        targetRecipient = foundRecipient.username.toLowerCase();
        targetRecipientName = foundRecipient.displayName || foundRecipient.username;
      }

      const escapedSender = escapeRegex(cleanSender);
      const sQuery = {
        $or: [
          { username: { $regex: '^' + escapedSender + '$', $options: 'i' } },
          { displayName: { $regex: '^' + escapedSender + '$', $options: 'i' } },
          { email: { $regex: '^' + escapedSender + '$', $options: 'i' } },
        ],
      };
      const sPattern = makePhonePattern(cleanSender);
      if (sPattern) {
        sQuery.$or.push({ phone: { $regex: sPattern } });
      }
      const foundSender = await User.findOne(sQuery, 'username displayName phone').lean();
      if (foundSender && foundSender.username) {
        targetSender = foundSender.username.toLowerCase();
        targetSenderName = foundSender.displayName || foundSender.username;
      }
    } catch (e) {
      console.warn('[User Lookup Warning]:', e.message);
    }

    const formattedTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMsg = new Message({
      sender: targetSender,
      senderName: targetSenderName,
      recipient: targetRecipient,
      recipientName: targetRecipientName,
      text: cleanText,
      mediaType: cleanMediaType,
      mediaUrl: cleanMediaUrl,
      fileName: cleanFileName,
      fileSize: cleanFileSize,
      time: formattedTime,
      read: false,
    });

    const saved = await newMsg.save();

    let replyMessage = null;
    // Optional automated reply for instant test demonstration
    if (autoReply) {
      let replyTexts = [
        `Hey ${targetSenderName}! Thanks for your message: "${cleanText}"`,
        `Got it! I am online now.`,
        `Hi there! Hope you are doing great today!`,
        `Thanks for reaching out! Let me know if you need any assistance.`,
        `Hello! Nice to connect with you on Assistance!`,
      ];
      if (cleanMediaType === 'image') {
        replyTexts = [
          `Great photo, ${targetSenderName}! Thanks for sharing!`,
          `Got the image! Looks amazing.`,
          `Nice picture! 👍`,
        ];
      } else if (cleanMediaType === 'video') {
        replyTexts = [
          `Received your video, ${targetSenderName}! Thanks for sending!`,
          `Awesome clip! 🎥`,
          `Got the video! Playing it now.`,
        ];
      } else if (cleanMediaType === 'document') {
        replyTexts = [
          `Received your document "${cleanFileName || 'document'}"! Thanks!`,
          `Got the file! Downloading it now. 📄`,
          `Thank you for sending the document, ${targetSenderName}.`,
        ];
      }
      const randomText = replyTexts[Math.floor(Math.random() * replyTexts.length)];
      const replyMsg = new Message({
        sender: targetRecipient,
        senderName: targetRecipientName,
        recipient: targetSender,
        recipientName: targetSenderName,
        text: randomText,
        time: formattedTime,
        read: false,
      });
      replyMessage = await replyMsg.save();
    }

    const senderAliases = await resolveUserAliases(targetSender);

    return res.status(201).json({
      success: true,
      message: formatMessage(saved, senderAliases),
      reply: replyMessage ? formatMessage(replyMessage, senderAliases) : null,
    });
  } catch (err) {
    console.error('[Chat API Error - Send]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message: ' + (err.message || 'Server error'),
    });
  }
});

/**
 * GET /api/chat/conversation
 * Fetch all messages between user1 and user2 with universal alias resolution
 */
router.get('/conversation', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  try {
    const { user1, user2 } = req.query;

    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        error: 'Both user1 and user2 query parameters are required.',
      });
    }

    const user1Aliases = await resolveUserAliases(user1);
    const user2Aliases = await resolveUserAliases(user2);

    const messages = await Message.find({
      $and: [
        {
          $or: [
            { sender: { $in: user1Aliases }, recipient: { $in: user2Aliases } },
            { sender: { $in: user2Aliases }, recipient: { $in: user1Aliases } },
          ],
        },
        { sender: { $type: 'string', $ne: '' } },
        { recipient: { $type: 'string', $ne: '' } },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    // Mark messages received by user1 as read in the background
    Message.updateMany(
      { sender: { $in: user2Aliases }, recipient: { $in: user1Aliases }, read: false },
      { $set: { read: true } }
    ).catch((e) => console.error('[Chat Read Update Error]:', e));

    const formatted = messages.map((m) => formatMessage(m, user1Aliases));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      messages: formatted,
    });
  } catch (err) {
    console.error('[Chat API Error - Conversation]:', err);
    return res.status(200).json({
      success: true,
      count: 0,
      messages: [],
      offline: true,
    });
  }
});

/**
 * POST /api/chat/simulate-reply
 * Explicitly generate a simulated response from the contact to test incoming messages
 */
router.post('/simulate-reply', async (req, res) => {
  try {
    const { sender, recipient, recipientName, senderName, customText } = req.body;

    if (!sender || !recipient) {
      return res.status(400).json({
        success: false,
        error: 'sender and recipient are required.',
      });
    }

    // In a reply, the sender is the contact, and the recipient is the logged in user
    const contactSender = String(sender).trim().toLowerCase();
    const currentUserRecipient = String(recipient).trim().toLowerCase();

    const cannedReplies = [
      'Hey there! Good to hear from you.',
      'Hello! How is everything going?',
      'Thanks for reaching out! Let me know if you need any help.',
      'Nice! I just saw your message.',
      'Sounds great! Talk to you soon.',
    ];

    const replyText =
      customText && String(customText).trim()
        ? String(customText).trim()
        : cannedReplies[Math.floor(Math.random() * cannedReplies.length)];

    const formattedTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const replyMsg = new Message({
      sender: contactSender,
      senderName: senderName || contactSender,
      recipient: currentUserRecipient,
      recipientName: recipientName || currentUserRecipient,
      text: replyText,
      time: formattedTime,
      read: false,
    });

    const saved = await replyMsg.save();

    const recipientAliases = await resolveUserAliases(currentUserRecipient);

    return res.status(201).json({
      success: true,
      message: formatMessage(saved, recipientAliases),
    });
  } catch (err) {
    console.error('[Chat API Error - Simulate Reply]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to simulate reply: ' + (err.message || 'Server error'),
    });
  }
});

/**
 * GET /api/chat/recent
 * Get all recent conversations for a user with unread counts and contact profiles
 */
router.get('/recent', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'user parameter is required.',
      });
    }

    const userAliases = await resolveUserAliases(user);

    const messages = await Message.find({
      $and: [
        {
          $or: [{ sender: { $in: userAliases } }, { recipient: { $in: userAliases } }],
        },
        { sender: { $type: 'string', $ne: '' } },
        { recipient: { $type: 'string', $ne: '' } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    const conversationMap = new Map();

    for (const msg of messages) {
      if (!msg) continue;
      const rawSender = msg.sender != null ? String(msg.sender).trim() : '';
      const rawRecipient = msg.recipient != null ? String(msg.recipient).trim() : '';
      const lowerSender = rawSender.toLowerCase();
      const lowerRecipient = rawRecipient.toLowerCase();

      // Skip invalid entries missing both sender and recipient
      if (!lowerSender && !lowerRecipient) continue;

      const senderDigits = normalizeDigits(rawSender);
      const isSender = Boolean(
        userAliases.includes(lowerSender) ||
        userAliases.includes(rawSender) ||
        (senderDigits && userAliases.includes(senderDigits))
      );

      const otherUser = isSender
        ? (lowerRecipient || 'unknown')
        : (lowerSender || 'unknown');
      const otherName = isSender
        ? (msg.recipientName || rawRecipient || otherUser)
        : (msg.senderName || rawSender || otherUser);

      if (!otherUser || otherUser === 'unknown') continue;

      let lastSnippet = msg.text || '';
      if (!lastSnippet) {
        if (msg.mediaType === 'image') lastSnippet = '📷 Photo';
        else if (msg.mediaType === 'video') lastSnippet = '🎥 Video';
        else if (msg.mediaType === 'document') lastSnippet = `📄 ${msg.fileName || 'Document'}`;
      }

      if (!conversationMap.has(otherUser)) {
        conversationMap.set(otherUser, {
          contact: otherUser,
          contactName: otherName || otherUser,
          lastMessage: lastSnippet,
          lastMediaType: msg.mediaType || 'text',
          lastTime: msg.time || '',
          lastTimestamp: msg.createdAt || new Date(),
          lastSender: rawSender,
          isSentByMe: isSender,
          unread: !isSender && !msg.read ? 1 : 0,
        });
      } else if (!isSender && !msg.read) {
        const item = conversationMap.get(otherUser);
        item.unread = (item.unread || 0) + 1;
      }
    }

    const conversations = Array.from(conversationMap.values());

    // Enrich conversations with registered user details (avatar, display name, status, phone)
    for (const conv of conversations) {
      try {
        const escapedContact = escapeRegex(conv.contact);
        const query = {
          $or: [
            { username: { $regex: '^' + escapedContact + '$', $options: 'i' } },
            { displayName: { $regex: '^' + escapedContact + '$', $options: 'i' } },
            { email: { $regex: '^' + escapedContact + '$', $options: 'i' } },
          ],
        };
        const cPattern = makePhonePattern(conv.contact);
        if (cPattern) {
          query.$or.push({ phone: { $regex: cPattern } });
        }

        const u = await User.findOne(query, 'username displayName avatar phone status').lean();
        if (u) {
          conv.contactName = u.displayName || u.username || conv.contactName;
          conv.username = u.username;
          conv.phone = u.phone;
          conv.avatar = u.avatar || null;
          conv.status = u.status || 'Active on Assistance';
        }
      } catch (e) {
        // Fallback
      }
    }

    const totalUnread = conversations.reduce((acc, c) => acc + (c.unread || 0), 0);

    return res.status(200).json({
      success: true,
      totalUnread,
      conversations,
    });
  } catch (err) {
    console.error('[Chat API Error - Recent]:', err);
    return res.status(200).json({
      success: true,
      totalUnread: 0,
      conversations: [],
      offline: true,
    });
  }
});

/**
 * DELETE /api/chat/conversation
 * Clear message history between two users
 */
router.delete('/conversation', async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        error: 'user1 and user2 are required.',
      });
    }

    const user1Aliases = await resolveUserAliases(user1);
    const user2Aliases = await resolveUserAliases(user2);

    const result = await Message.deleteMany({
      $or: [
        { sender: { $in: user1Aliases }, recipient: { $in: user2Aliases } },
        { sender: { $in: user2Aliases }, recipient: { $in: user1Aliases } },
      ],
    });

    return res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: 'Conversation cleared successfully.',
    });
  } catch (err) {
    console.error('[Chat API Error - Delete Conversation]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to clear conversation: ' + (err.message || 'Server error'),
    });
  }
});

export default router;
