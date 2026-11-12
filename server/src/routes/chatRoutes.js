import express from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

const router = express.Router();

// Helper to normalize conversation ID between any two users
export const getConversationId = (u1, u2) => {
  const a = String(u1 || '').trim().toLowerCase();
  const b = String(u2 || '').trim().toLowerCase();
  return [a, b].sort().join(':');
};

// In-memory fallback stores when MongoDB is disconnected
const inMemoryMessages = [];
const inMemoryConversations = new Map();

// Helper to fetch user details for display
const getUserProfile = async (username) => {
  const cleanUser = String(username || '').trim().toLowerCase();
  if (mongoose.connection.readyState === 1) {
    try {
      const user = await User.findOne({ username: cleanUser }).select('username displayName avatar status phone').lean();
      if (user) {
        return {
          username: user.username,
          name: user.displayName || user.username,
          avatar: user.avatar || null,
          status: user.status || 'Hey there! I am using Assistance',
          phone: user.phone || '',
        };
      }
    } catch {}
  }
  return {
    username: cleanUser,
    name: cleanUser,
    avatar: null,
    status: 'Hey there! I am using Assistance',
    phone: '',
  };
};

// GET /api/chat/conversations?username=:username
// Returns all conversations for the given user
router.get('/conversations', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    const rawUser = req.query.username;
    if (!rawUser) {
      return res.status(400).json({ success: false, message: 'username query param is required' });
    }
    const username = String(rawUser).trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const convs = await Conversation.find({ participants: username })
        .sort({ updatedAt: -1 })
        .lean();

      const result = await Promise.all(
        convs.map(async (conv) => {
          const otherUsername = conv.participants.find((p) => p !== username) || username;
          const otherProfile = await getUserProfile(otherUsername);
          const unreadCount = conv.unreadCounts ? (conv.unreadCounts[username] || 0) : 0;

          return {
            id: conv.conversationId,
            conversationId: conv.conversationId,
            name: otherProfile.name,
            username: otherUsername,
            avatar: otherProfile.avatar,
            status: otherProfile.status,
            phone: otherProfile.phone,
            unread: unreadCount,
            lastMessage: conv.lastMessage || null,
            updatedAt: conv.updatedAt,
          };
        })
      );

      return res.status(200).json({ success: true, conversations: result });
    } else {
      // In-memory fallback
      const result = [];
      for (const conv of inMemoryConversations.values()) {
        if (conv.participants.includes(username)) {
          const otherUsername = conv.participants.find((p) => p !== username) || username;
          const otherProfile = await getUserProfile(otherUsername);
          result.push({
            id: conv.conversationId,
            conversationId: conv.conversationId,
            name: otherProfile.name,
            username: otherUsername,
            avatar: otherProfile.avatar,
            status: otherProfile.status,
            phone: otherProfile.phone,
            unread: conv.unreadCounts?.[username] || 0,
            lastMessage: conv.lastMessage || null,
            updatedAt: conv.updatedAt,
          });
        }
      }
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return res.status(200).json({ success: true, conversations: result });
    }
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching conversations', error: error.message });
  }
});

// GET /api/chat/messages/:otherUser?username=:username
// Returns message history between username and otherUser, and marks unread as read
router.get('/messages/:otherUser', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    const rawUser = req.query.username;
    const rawOther = req.params.otherUser;

    if (!rawUser || !rawOther) {
      return res.status(400).json({ success: false, message: 'Both username and otherUser are required' });
    }

    const username = String(rawUser).trim().toLowerCase();
    const otherUser = String(rawOther).trim().toLowerCase();
    const convId = getConversationId(username, otherUser);

    if (mongoose.connection.readyState === 1) {
      // Fetch messages
      const messages = await Message.find({ conversationId: convId })
        .sort({ createdAt: 1 })
        .lean();

      // Mark unread messages sent by otherUser as read
      const unreadCount = await Message.countDocuments({
        conversationId: convId,
        receiver: username,
        read: false,
      });

      if (unreadCount > 0) {
        await Message.updateMany(
          { conversationId: convId, receiver: username, read: false },
          { $set: { read: true, readAt: new Date() } }
        );

        // Reset unread count for username in Conversation
        const updateField = `unreadCounts.${username}`;
        await Conversation.updateOne(
          { conversationId: convId },
          { $set: { [updateField]: 0 } }
        );

        const io = req.app.get('io');
        if (io) {
          const readTargets = new Set([
            otherUser,
            cleanOther,
            cleanOther.replace(/\s+/g, ''),
            cleanOther.split(' ')[0],
          ]);
          for (const t of readTargets) {
            if (t) io.to(t).emit('chat:read', { conversationId: convId, reader: username });
          }
        }
      }

      const formatted = messages.map((m) => ({
        id: m._id.toString(),
        sender: m.sender === username ? 'me' : 'them',
        senderUsername: m.sender,
        receiverUsername: m.receiver,
        text: m.text,
        attachment: m.attachment || null,
        read: m.read,
        time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: m.createdAt,
      }));

      return res.status(200).json({ success: true, messages: formatted });
    } else {
      // In-memory fallback
      const messages = inMemoryMessages.filter((m) => m.conversationId === convId);
      messages.forEach((m) => {
        if (m.receiver === username && !m.read) {
          m.read = true;
          m.readAt = new Date();
        }
      });

      const conv = inMemoryConversations.get(convId);
      if (conv && conv.unreadCounts) {
        conv.unreadCounts[username] = 0;
      }

      const formatted = messages.map((m) => ({
        id: m.id,
        sender: m.sender === username ? 'me' : 'them',
        senderUsername: m.sender,
        receiverUsername: m.receiver,
        text: m.text,
        attachment: m.attachment || null,
        read: m.read,
        time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: m.createdAt,
      }));

      return res.status(200).json({ success: true, messages: formatted });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching messages', error: error.message });
  }
});

// POST /api/chat/send
// Sends a new message and updates conversation
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, text, attachment } = req.body;

    if (!sender || !receiver || (!text && !attachment)) {
      return res.status(400).json({
        success: false,
        message: 'sender, receiver, and message text or attachment are required',
      });
    }

    const cleanSender = String(sender).trim().toLowerCase();
    const cleanReceiver = String(receiver).trim().toLowerCase();
    const cleanText = String(text || '').trim();
    const convId = getConversationId(cleanSender, cleanReceiver);
    const now = new Date();

    let savedMessage = null;

    if (mongoose.connection.readyState === 1) {
      // 1. Create Message
      const newMsg = await Message.create({
        conversationId: convId,
        sender: cleanSender,
        receiver: cleanReceiver,
        text: cleanText,
        attachment: attachment || null,
        read: false,
      });

      // 2. Upsert Conversation
      const conv = await Conversation.findOne({ conversationId: convId });
      let currentUnread = 0;
      if (conv && conv.unreadCounts) {
        currentUnread = conv.unreadCounts.get ? (conv.unreadCounts.get(cleanReceiver) || 0) : (conv.unreadCounts[cleanReceiver] || 0);
      }
      const newUnread = currentUnread + 1;

      const updatedConv = await Conversation.findOneAndUpdate(
        { conversationId: convId },
        {
          $setOnInsert: {
            conversationId: convId,
            participants: [cleanSender, cleanReceiver],
          },
          $set: {
            lastMessage: {
              text: cleanText,
              sender: cleanSender,
              createdAt: now,
              read: false,
            },
            [`unreadCounts.${cleanReceiver}`]: newUnread,
            [`unreadCounts.${cleanSender}`]: 0,
            updatedAt: now,
          },
        },
        { upsert: true, new: true }
      );

      savedMessage = {
        id: newMsg._id.toString(),
        conversationId: convId,
        sender: cleanSender,
        receiver: cleanReceiver,
        text: newMsg.text,
        attachment: newMsg.attachment,
        read: false,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: now,
      };
    } else {
      // In-memory fallback
      const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
      savedMessage = {
        id: msgId,
        conversationId: convId,
        sender: cleanSender,
        receiver: cleanReceiver,
        text: cleanText,
        attachment: attachment || null,
        read: false,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: now,
      };
      inMemoryMessages.push(savedMessage);

      let conv = inMemoryConversations.get(convId);
      if (!conv) {
        conv = {
          conversationId: convId,
          participants: [cleanSender, cleanReceiver],
          unreadCounts: {},
        };
      }
      conv.lastMessage = {
        text: cleanText,
        sender: cleanSender,
        createdAt: now,
        read: false,
      };
      conv.unreadCounts[cleanReceiver] = (conv.unreadCounts[cleanReceiver] || 0) + 1;
      conv.unreadCounts[cleanSender] = 0;
      conv.updatedAt = now;
      inMemoryConversations.set(convId, conv);
    }

    // Broadcast via Socket.io if initialized
    const io = req.app.get('io');
    if (io) {
      const targets = new Set([
        cleanReceiver,
        cleanReceiver.replace(/\s+/g, ''),
        cleanReceiver.split(' ')[0],
        cleanSender,
        cleanSender.replace(/\s+/g, ''),
        cleanSender.split(' ')[0],
        String(receiver).trim(),
        String(sender).trim(),
      ]);

      for (const target of targets) {
        if (target) {
          io.to(target).emit('chat:message', savedMessage);
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ success: false, message: 'Server error sending message', error: error.message });
  }
});

// POST /api/chat/read
// Explicitly marks conversation messages as read
router.post('/read', async (req, res) => {
  try {
    const { username, otherUser } = req.body;
    if (!username || !otherUser) {
      return res.status(400).json({ success: false, message: 'username and otherUser are required' });
    }

    const cleanUser = String(username).trim().toLowerCase();
    const cleanOther = String(otherUser).trim().toLowerCase();
    const convId = getConversationId(cleanUser, cleanOther);

    if (mongoose.connection.readyState === 1) {
      await Message.updateMany(
        { conversationId: convId, receiver: cleanUser, read: false },
        { $set: { read: true, readAt: new Date() } }
      );
      await Conversation.updateOne(
        { conversationId: convId },
        { $set: { [`unreadCounts.${cleanUser}`]: 0 } }
      );
    } else {
      inMemoryMessages.forEach((m) => {
        if (m.conversationId === convId && m.receiver === cleanUser) {
          m.read = true;
          m.readAt = new Date();
        }
      });
      const conv = inMemoryConversations.get(convId);
      if (conv && conv.unreadCounts) {
        conv.unreadCounts[cleanUser] = 0;
      }
    }

    const io = req.app.get('io');
    if (io) {
      io.to(cleanOther).emit('chat:read', { conversationId: convId, reader: cleanUser });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/chat/start
// Starts or verifies a conversation with a contact
router.post('/start', async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    if (!sender || !receiver) {
      return res.status(400).json({ success: false, message: 'sender and receiver are required' });
    }

    const cleanSender = String(sender).trim().toLowerCase();
    const cleanReceiver = String(receiver).trim().toLowerCase();
    const convId = getConversationId(cleanSender, cleanReceiver);

    const otherProfile = await getUserProfile(cleanReceiver);

    if (mongoose.connection.readyState === 1) {
      let conv = await Conversation.findOne({ conversationId: convId }).lean();
      if (!conv) {
        const created = await Conversation.create({
          conversationId: convId,
          participants: [cleanSender, cleanReceiver],
          lastMessage: {
            text: '',
            sender: cleanSender,
            createdAt: new Date(),
            read: true,
          },
          unreadCounts: { [cleanSender]: 0, [cleanReceiver]: 0 },
          updatedAt: new Date(),
        });
        conv = created.toObject();
      }

      return res.status(200).json({
        success: true,
        conversation: {
          id: conv.conversationId,
          conversationId: conv.conversationId,
          name: otherProfile.name,
          username: cleanReceiver,
          avatar: otherProfile.avatar,
          status: otherProfile.status,
          phone: otherProfile.phone,
          unread: 0,
          lastMessage: conv.lastMessage || null,
          updatedAt: conv.updatedAt,
        },
      });
    } else {
      let conv = inMemoryConversations.get(convId);
      if (!conv) {
        conv = {
          conversationId: convId,
          participants: [cleanSender, cleanReceiver],
          lastMessage: {
            text: '',
            sender: cleanSender,
            createdAt: new Date(),
            read: true,
          },
          unreadCounts: { [cleanSender]: 0, [cleanReceiver]: 0 },
          updatedAt: new Date(),
        };
        inMemoryConversations.set(convId, conv);
      }

      return res.status(200).json({
        success: true,
        conversation: {
          id: conv.conversationId,
          conversationId: conv.conversationId,
          name: otherProfile.name,
          username: cleanReceiver,
          avatar: otherProfile.avatar,
          status: otherProfile.status,
          phone: otherProfile.phone,
          unread: 0,
          lastMessage: conv.lastMessage,
          updatedAt: conv.updatedAt,
        },
      });
    }
  } catch (error) {
    console.error('Error starting conversation:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;
