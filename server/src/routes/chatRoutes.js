import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Message from '../models/Message.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatUploadsDir = path.resolve(__dirname, '../../uploads/chat');

if (!fs.existsSync(chatUploadsDir)) {
  fs.mkdirSync(chatUploadsDir, { recursive: true });
}

/**
 * Helper to save base64 data to disk in uploads/chat directory
 */
const saveBase64MediaToDisk = (base64String = '', mediaType = 'image', originalFileName = '') => {
  if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:')) {
    return base64String;
  }
  try {
    const commaIndex = base64String.indexOf(',');
    if (commaIndex === -1) {
      return base64String;
    }
    const header = base64String.substring(0, commaIndex);
    const base64Data = base64String.substring(commaIndex + 1);
    const mimeMatch = header.match(/data:([^;]+)/);
    const mimeType = (mimeMatch ? mimeMatch[1] : '').toLowerCase();
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = '';
    if (originalFileName && path.extname(originalFileName)) {
      ext = path.extname(originalFileName).toLowerCase();
    } else if (mediaType === 'image') {
      ext = mimeType.includes('png') ? '.png' : mimeType.includes('webp') ? '.webp' : mimeType.includes('gif') ? '.gif' : '.jpg';
    } else if (mediaType === 'video') {
      ext = mimeType.includes('webm') ? '.webm' : mimeType.includes('mov') ? '.mov' : '.mp4';
    } else if (mediaType === 'document') {
      ext = mimeType.includes('pdf') ? '.pdf' : mimeType.includes('word') || mimeType.includes('doc') ? '.docx' : mimeType.includes('sheet') || mimeType.includes('xls') ? '.xlsx' : '.txt';
    } else {
      ext = '.bin';
    }

    const safeBase = originalFileName
      ? path.basename(originalFileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30)
      : mediaType;
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${safeBase}${ext}`;
    const targetFilePath = path.join(chatUploadsDir, uniqueFileName);

    fs.writeFileSync(targetFilePath, buffer);
    return `/uploads/chat/${uniqueFileName}`;
  } catch (err) {
    console.error('[Save Base64 Media Error]:', err);
    return base64String;
  }
};

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

const aliasCache = new Map();

/**
 * Resolve all possible aliases (username, phone, email, display name) for a user with in-memory caching
 */
const resolveUserAliases = async (identifier = '') => {
  if (!identifier) return [];
  const raw = String(identifier).trim();
  const lowerRaw = raw.toLowerCase();
  const digits = normalizeDigits(raw);

  const cacheKey = lowerRaw;
  const cached = aliasCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.aliases;
  }

  const aliases = new Set([raw, lowerRaw]);
  if (digits) {
    aliases.add(digits);
  }

  if (mongoose.connection.readyState !== 1) {
    return Array.from(aliases);
  }

  let foundMatch = false;
  try {
    const escaped = escapeRegex(raw);
    const phonePattern = makePhonePattern(raw);

    const exactOrConditions = [
      { username: lowerRaw },
      { email: lowerRaw },
      { displayName: raw },
      { displayName: { $regex: '^' + escaped + '$', $options: 'i' } },
      { phone: raw },
      ...(digits ? [{ phone: digits }] : []),
      ...(phonePattern ? [{ phone: { $regex: phonePattern } }] : []),
    ];

    const matchedUsers = await User.find(
      { $or: exactOrConditions },
      'username displayName phone email'
    )
      .limit(5)
      .maxTimeMS(3000)
      .lean();

    if (matchedUsers && matchedUsers.length > 0) {
      foundMatch = true;
    }

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

  const result = Array.from(aliases);
  // Cache resolved user aliases briefly; avoid caching misses so newly registered contacts resolve immediately
  if (foundMatch) {
    aliasCache.set(cacheKey, { aliases: result, expiresAt: Date.now() + 30 * 1000 });
  }
  return result;
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

  const isReadReceipt = msg?.receiptRead !== undefined ? !!msg.receiptRead : !!msg?.read;
  const isDelivered = Boolean(
    msg?.delivered ||
    msg?.read ||
    isReadReceipt ||
    msg?.status === 'delivered' ||
    msg?.status === 'read'
  );
  const computedStatus = isReadReceipt
    ? 'read'
    : isDelivered
      ? 'delivered'
      : msg?.status === 'sending' || msg?.status === 'failed'
        ? msg.status
        : 'sent';

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
    status: computedStatus,
    delivered: isDelivered,
    deliveredAt: msg?.deliveredAt || null,
    read: !!msg?.read,
    receiptRead: isReadReceipt,
    readAt: msg?.readAt || null,
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

    const rawSender = sender ? String(sender).trim() : '';
    const rawRecipient = recipient ? String(recipient).trim() : '';
    const cleanSender = rawSender.toLowerCase();
    const cleanRecipient = rawRecipient.toLowerCase();
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
    let targetRecipientName = recipientName || rawRecipient;
    let targetSender = cleanSender;
    let targetSenderName = senderName || rawSender;
    const senderAliases = new Set([cleanSender, rawSender]);
    const sRawDigits = normalizeDigits(rawSender);
    if (sRawDigits) senderAliases.add(sRawDigits);

    try {
      const rDigits = normalizeDigits(rawRecipient);
      const rPhonePattern = makePhonePattern(rawRecipient);
      const rEscaped = escapeRegex(rawRecipient);

      const sDigits = normalizeDigits(rawSender);
      const sPhonePattern = makePhonePattern(rawSender);
      const sEscaped = escapeRegex(rawSender);

      let lookupTimer;
      const [foundRecipient, foundSender] = await Promise.race([
        Promise.all([
          User.findOne(
            {
              $or: [
                { username: cleanRecipient },
                { email: cleanRecipient },
                { displayName: rawRecipient },
                { displayName: { $regex: '^' + rEscaped + '$', $options: 'i' } },
                { phone: rawRecipient },
                ...(rDigits ? [{ phone: rDigits }] : []),
                ...(rPhonePattern ? [{ phone: { $regex: rPhonePattern } }] : []),
              ],
            },
            'username displayName phone'
          )
            .maxTimeMS(4000)
            .lean(),
          User.findOne(
            {
              $or: [
                { username: cleanSender },
                { email: cleanSender },
                { displayName: rawSender },
                { displayName: { $regex: '^' + sEscaped + '$', $options: 'i' } },
                { phone: rawSender },
                ...(sDigits ? [{ phone: sDigits }] : []),
                ...(sPhonePattern ? [{ phone: { $regex: sPhonePattern } }] : []),
              ],
            },
            'username displayName phone'
          )
            .maxTimeMS(4000)
            .lean(),
        ]),
        new Promise((resolve) => {
          lookupTimer = setTimeout(() => resolve([null, null]), 4000);
        }),
      ]).finally(() => clearTimeout(lookupTimer));

      if (foundRecipient && foundRecipient.username) {
        targetRecipient = foundRecipient.username.toLowerCase();
        targetRecipientName = foundRecipient.displayName || foundRecipient.username;
      }

      if (foundSender && foundSender.username) {
        targetSender = foundSender.username.toLowerCase();
        targetSenderName = foundSender.displayName || foundSender.username;
        senderAliases.add(targetSender);
        if (foundSender.displayName) senderAliases.add(foundSender.displayName.toLowerCase());
        if (foundSender.phone) {
          senderAliases.add(foundSender.phone.toLowerCase());
          const fDigits = normalizeDigits(foundSender.phone);
          if (fDigits) senderAliases.add(fDigits);
        }
      }
    } catch (e) {
      console.warn('[User Lookup Warning]:', e.message);
    }

    const formattedTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    let finalMediaUrl = cleanMediaUrl;
    if (cleanMediaUrl && cleanMediaUrl.startsWith('data:')) {
      finalMediaUrl = saveBase64MediaToDisk(cleanMediaUrl, cleanMediaType, cleanFileName);
    }

    const newMsg = new Message({
      sender: targetSender,
      senderName: targetSenderName,
      recipient: targetRecipient,
      recipientName: targetRecipientName,
      text: cleanText,
      mediaType: cleanMediaType,
      mediaUrl: finalMediaUrl,
      fileName: cleanFileName,
      fileSize: cleanFileSize,
      time: formattedTime,
      status: 'sent',
      delivered: false,
      read: false,
      receiptRead: false,
    });

    let saveTimer;
    let saved;
    try {
      saved = await Promise.race([
        newMsg.save(),
        new Promise((_, reject) => {
          saveTimer = setTimeout(() => {
            const err = new Error('Message save timed out');
            err.isTimeout = true;
            reject(err);
          }, 15000);
        }),
      ]);
    } finally {
      clearTimeout(saveTimer);
    }

    let replyMessage = null;
    // Optional automated reply for instant test demonstration
    if (autoReply) {
      let replyTexts = [
        `Hey ${targetSenderName}! Thanks for your message: "${cleanText}"`,
        `Got it! I am online now.`,
        `Hi there! Hope you are doing great today!`,
        `Thanks for reaching out! Let me know if you need any assistance.`,
        `Hello! Nice to connect with you on Planet!`,
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

    const senderAliasList = Array.from(senderAliases);
    const formattedSaved = {
      ...formatMessage(saved, senderAliasList),
      isSent: true,
    };

    return res.status(201).json({
      success: true,
      message: formattedSaved,
      reply: replyMessage ? formatMessage(replyMessage, senderAliasList) : null,
    });
  } catch (err) {
    console.error('[Chat API Error - Send]:', err);
    if (res.headersSent) return;
    if (err?.isTimeout) {
      return res.status(503).json({
        success: false,
        error: 'Message server timed out while saving. Please retry.',
      });
    }
    return res.status(500).json({
      success: false,
      error: 'Failed to send message: ' + (err.message || 'Server error'),
    });
  }
});

/**
 * POST /api/chat/upload
 * Direct media upload endpoint for images, videos, and documents
 */
router.post('/upload', async (req, res) => {
  try {
    const { media, mediaType = 'image', fileName = '', fileSize = '' } = req.body;
    if (!media) {
      return res.status(400).json({ success: false, error: 'No media provided.' });
    }
    const cleanMediaType = ['image', 'video', 'document'].includes(mediaType) ? mediaType : 'image';
    const cleanFileName = String(fileName || '').trim();
    const cleanFileSize = String(fileSize || '').trim();

    let savedUrl = media;
    if (typeof media === 'string' && media.startsWith('data:')) {
      savedUrl = saveBase64MediaToDisk(media, cleanMediaType, cleanFileName);
    }

    return res.status(200).json({
      success: true,
      url: savedUrl,
      mediaType: cleanMediaType,
      fileName: cleanFileName,
      fileSize: cleanFileSize,
    });
  } catch (err) {
    console.error('[Chat Upload Error]:', err);
    if (res.headersSent) return;
    return res.status(500).json({
      success: false,
      error: 'Upload failed: ' + (err.message || 'Server error'),
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

    const sendReadReceipts = req.query.readReceipts !== 'false';
    const [user1Aliases, user2Aliases] = await Promise.all([
      resolveUserAliases(user1),
      resolveUserAliases(user2),
    ]);
    const cleanUser1Aliases = Array.from(new Set(user1Aliases.map((a) => String(a || '').trim().toLowerCase()).filter(Boolean)));
    const cleanUser2Aliases = Array.from(new Set(user2Aliases.map((a) => String(a || '').trim().toLowerCase()).filter(Boolean)));

    const messages = await Message.find({
      $or: [
        { sender: { $in: cleanUser1Aliases }, recipient: { $in: cleanUser2Aliases } },
        { sender: { $in: cleanUser2Aliases }, recipient: { $in: cleanUser1Aliases } },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(300)
      .maxTimeMS(4000)
      .lean();

    const user1Set = new Set(cleanUser1Aliases);
    const user2Set = new Set(cleanUser2Aliases);
    const undeliveredIds = [];
    const unreadIds = [];

    const now = new Date();
    for (const m of messages) {
      const s = String(m.sender || '').trim().toLowerCase();
      const r = String(m.recipient || '').trim().toLowerCase();
      const isIncoming = user2Set.has(s) && user1Set.has(r);
      if (!isIncoming) continue;

      if (!m.delivered) {
        undeliveredIds.push(m._id);
        m.delivered = true;
        m.deliveredAt = m.deliveredAt || now;
      }
      if (!m.read) {
        unreadIds.push(m._id);
        m.read = true;
        if (sendReadReceipts) {
          m.receiptRead = true;
          m.readAt = now;
          m.status = 'read';
        } else {
          m.receiptRead = false;
          m.status = 'delivered';
        }
      }
    }

    // Only write to DB when there are actually undelivered or unread incoming messages
    if (undeliveredIds.length > 0) {
      Message.updateMany(
        { _id: { $in: undeliveredIds } },
        { $set: { delivered: true, deliveredAt: now } }
      ).catch((e) => console.error('[Chat Delivery Update Error]:', e));
    }
    if (unreadIds.length > 0) {
      Message.updateMany(
        { _id: { $in: unreadIds } },
        {
          $set: sendReadReceipts
            ? { read: true, receiptRead: true, readAt: now, status: 'read' }
            : { read: true, receiptRead: false, status: 'delivered' },
        }
      ).catch((e) => console.error('[Chat Read Update Error]:', e));
    }

    const formatted = messages.map((m) => formatMessage(m, cleanUser1Aliases));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      messages: formatted,
    });
  } catch (err) {
    console.error('[Chat API Error - Conversation]:', err);
    if (res.headersSent) return;
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

    // If contact replied, mark prior messages from currentUser to contact as delivered and read
    const now = new Date();
    await Message.updateMany(
      { sender: currentUserRecipient, recipient: contactSender, read: false },
      { $set: { delivered: true, deliveredAt: now, read: true, receiptRead: true, readAt: now, status: 'read' } }
    ).catch(() => {});

    const recipientAliases = await resolveUserAliases(currentUserRecipient);

    return res.status(201).json({
      success: true,
      message: formatMessage(saved, recipientAliases),
    });
  } catch (err) {
    console.error('[Chat API Error - Simulate Reply]:', err);
    if (res.headersSent) return;
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
    const cleanAliases = Array.from(
      new Set(userAliases.map((a) => String(a || '').trim().toLowerCase()).filter((a) => a.length > 0))
    );

    const messages = await Message.find({
      $or: [{ sender: { $in: cleanAliases } }, { recipient: { $in: cleanAliases } }],
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .maxTimeMS(4000)
      .lean();

    // Mark any pending incoming messages for this user as delivered only when needed
    const now = new Date();
    const aliasSet = new Set(cleanAliases);
    const undeliveredIncomingIds = [];
    for (const m of messages) {
      const rLower = String(m?.recipient || '').trim().toLowerCase();
      if (aliasSet.has(rLower) && !m.delivered && !m.read) {
        undeliveredIncomingIds.push(m._id);
        m.delivered = true;
        m.deliveredAt = now;
        m.status = 'delivered';
      }
    }
    if (undeliveredIncomingIds.length > 0) {
      Message.updateMany(
        { _id: { $in: undeliveredIncomingIds } },
        { $set: { delivered: true, deliveredAt: now, status: 'delivered' } }
      ).catch((e) => console.error('[Chat Recent Delivery Error]:', e));
    }

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
        cleanAliases.includes(lowerSender) ||
        cleanAliases.includes(rawSender) ||
        (senderDigits && cleanAliases.includes(senderDigits))
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
        const isLastRead = msg.receiptRead !== undefined ? !!msg.receiptRead : !!msg.read;
        const isLastDelivered = Boolean(
          msg.delivered || msg.read || isLastRead || msg.status === 'delivered' || msg.status === 'read'
        );
        const lastStatus = isLastRead ? 'read' : isLastDelivered ? 'delivered' : 'sent';

        conversationMap.set(otherUser, {
          contact: otherUser,
          contactName: otherName || otherUser,
          lastMessage: lastSnippet,
          lastMediaType: msg.mediaType || 'text',
          lastTime: msg.time || '',
          lastTimestamp: msg.createdAt || new Date(),
          lastSender: rawSender,
          isSentByMe: isSender,
          lastStatus,
          lastDelivered: isLastDelivered,
          lastRead: isLastRead,
          lastReadAt: msg.readAt || null,
          unread: !isSender && !msg.read ? 1 : 0,
        });
      } else if (!isSender && !msg.read) {
        const item = conversationMap.get(otherUser);
        item.unread = (item.unread || 0) + 1;
      }
    }

    let conversations = Array.from(conversationMap.values());

    // Enrich conversations with registered user details in a single fast batch query
    const contactIdentifiers = Array.from(
      new Set(
        conversations
          .flatMap((c) => {
            const d = normalizeDigits(c.contact);
            return d ? [c.contact, d] : [c.contact];
          })
          .filter(Boolean)
      )
    );
    if (contactIdentifiers.length > 0) {
      try {
        const foundUsers = await User.find(
          {
            $or: [
              { username: { $in: contactIdentifiers } },
              { displayName: { $in: contactIdentifiers } },
              { phone: { $in: contactIdentifiers } },
            ],
          },
          'username displayName avatar phone status'
        )
          .limit(contactIdentifiers.length * 2)
          .maxTimeMS(3000)
          .lean();

        const userLookup = new Map();
        for (const u of foundUsers) {
          if (u.username) userLookup.set(u.username.toLowerCase(), u);
          if (u.displayName) userLookup.set(u.displayName.toLowerCase(), u);
          if (u.phone) {
            userLookup.set(u.phone, u);
            const uDigits = normalizeDigits(u.phone);
            if (uDigits) userLookup.set(uDigits, u);
          }
        }

        const mergedByCanonical = new Map();
        for (const conv of conversations) {
          const lowerC = String(conv.contact).toLowerCase();
          const cDigits = normalizeDigits(conv.contact);
          const u = userLookup.get(lowerC) || userLookup.get(conv.contact) || (cDigits && userLookup.get(cDigits));
          if (u) {
            conv.contactName = u.displayName || u.username || conv.contactName;
            conv.username = u.username;
            conv.phone = u.phone;
            conv.avatar = u.avatar || null;
            conv.status = u.status || 'Active on Planet';
          }
          const canonicalKey = (conv.username || cDigits || lowerC);
          const existing = mergedByCanonical.get(canonicalKey);
          if (!existing) {
            mergedByCanonical.set(canonicalKey, conv);
          } else {
            existing.unread = (existing.unread || 0) + (conv.unread || 0);
            if (new Date(conv.lastTimestamp).getTime() > new Date(existing.lastTimestamp).getTime()) {
              const combinedUnread = existing.unread;
              mergedByCanonical.set(canonicalKey, { ...conv, unread: combinedUnread });
            }
          }
        }
        conversations = Array.from(mergedByCanonical.values());
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
    console.error('[Chat API Error - Recent]:', err.message || err);
    if (res.headersSent) return;
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
    if (res.headersSent) return;
    return res.status(500).json({
      success: false,
      error: 'Failed to clear conversation: ' + (err.message || 'Server error'),
    });
  }
});

export default router;
