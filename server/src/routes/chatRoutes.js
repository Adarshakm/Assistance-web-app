import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * Format a message object for frontend consumption
 */
const formatMessage = (msg, currentUsername = '') => {
  const normCurrent = (currentUsername || '').toLowerCase().trim();
  const normSender = (msg.sender || '').toLowerCase().trim();
  const isMe = normCurrent ? normSender === normCurrent : false;

  return {
    id: msg._id ? msg._id.toString() : msg.id || String(Date.now()),
    _id: msg._id ? msg._id.toString() : undefined,
    sender: msg.sender,
    senderName: msg.senderName || msg.sender,
    recipient: msg.recipient,
    recipientName: msg.recipientName || msg.recipient,
    text: msg.text,
    time:
      msg.time ||
      (msg.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    createdAt: msg.createdAt || new Date(),
    read: !!msg.read,
    isSent: isMe,
  };
};

/**
 * POST /api/chat/send
 * Send a direct message between sender and recipient
 */
router.post('/send', async (req, res) => {
  try {
    const { sender, senderName, recipient, recipientName, text, autoReply } = req.body;

    if (!sender || !recipient || !text || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: 'sender, recipient, and text are required fields.',
      });
    }

    const cleanSender = String(sender).trim().toLowerCase();
    const cleanRecipient = String(recipient).trim().toLowerCase();
    const cleanText = String(text).trim();

    const formattedTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMsg = new Message({
      sender: cleanSender,
      senderName: senderName || cleanSender,
      recipient: cleanRecipient,
      recipientName: recipientName || cleanRecipient,
      text: cleanText,
      time: formattedTime,
      read: false,
    });

    const saved = await newMsg.save();

    let replyMessage = null;
    // Optional automated reply for instant test demonstration
    if (autoReply) {
      const replyTexts = [
        `Hey ${senderName || cleanSender}! Thanks for your message: "${cleanText}"`,
        `Got it! I am online now.`,
        `Hi there! Hope you are doing great today!`,
        `Thanks for reaching out! Let me know if you need any assistance.`,
        `Hello! Nice to connect with you on Assistance!`,
      ];
      const randomText = replyTexts[Math.floor(Math.random() * replyTexts.length)];
      const replyMsg = new Message({
        sender: cleanRecipient,
        senderName: recipientName || cleanRecipient,
        recipient: cleanSender,
        recipientName: senderName || cleanSender,
        text: randomText,
        time: formattedTime,
        read: false,
      });
      replyMessage = await replyMsg.save();
    }

    return res.status(201).json({
      success: true,
      message: formatMessage(saved, cleanSender),
      reply: replyMessage ? formatMessage(replyMessage, cleanSender) : null,
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
 * Fetch all messages between user1 and user2
 */
router.get('/conversation', async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        error: 'Both user1 and user2 query parameters are required.',
      });
    }

    const u1 = String(user1).trim().toLowerCase();
    const u2 = String(user2).trim().toLowerCase();

    const messages = await Message.find({
      $or: [
        { sender: u1, recipient: u2 },
        { sender: u2, recipient: u1 },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    // Mark messages received by user1 as read in the background
    Message.updateMany(
      { sender: u2, recipient: u1, read: false },
      { $set: { read: true } }
    ).catch((e) => console.error('[Chat Read Update Error]:', e));

    const formatted = messages.map((m) => formatMessage(m, u1));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      messages: formatted,
    });
  } catch (err) {
    console.error('[Chat API Error - Conversation]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch conversation: ' + (err.message || 'Server error'),
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

    return res.status(201).json({
      success: true,
      message: formatMessage(saved, currentUserRecipient),
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
 * Get all recent conversations for a user
 */
router.get('/recent', async (req, res) => {
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'user parameter is required.',
      });
    }

    const cleanUser = String(user).trim().toLowerCase();

    const messages = await Message.find({
      $or: [{ sender: cleanUser }, { recipient: cleanUser }],
    })
      .sort({ createdAt: -1 })
      .lean();

    // Group by the other user
    const conversationMap = new Map();

    for (const msg of messages) {
      const otherUser =
        msg.sender.toLowerCase() === cleanUser ? msg.recipient.toLowerCase() : msg.sender.toLowerCase();
      const otherName =
        msg.sender.toLowerCase() === cleanUser ? msg.recipientName : msg.senderName;

      if (!conversationMap.has(otherUser)) {
        conversationMap.set(otherUser, {
          contact: otherUser,
          contactName: otherName || otherUser,
          lastMessage: msg.text,
          lastTime: msg.time,
          lastTimestamp: msg.createdAt,
          lastSender: msg.sender,
          unread: msg.recipient.toLowerCase() === cleanUser && !msg.read ? 1 : 0,
        });
      } else if (msg.recipient.toLowerCase() === cleanUser && !msg.read) {
        const item = conversationMap.get(otherUser);
        item.unread = (item.unread || 0) + 1;
      }
    }

    return res.status(200).json({
      success: true,
      conversations: Array.from(conversationMap.values()),
    });
  } catch (err) {
    console.error('[Chat API Error - Recent]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch recent conversations: ' + (err.message || 'Server error'),
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

    const u1 = String(user1).trim().toLowerCase();
    const u2 = String(user2).trim().toLowerCase();

    const result = await Message.deleteMany({
      $or: [
        { sender: u1, recipient: u2 },
        { sender: u2, recipient: u1 },
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
