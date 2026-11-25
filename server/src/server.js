import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB, { waitForDBConnection, getLastDbError } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import callRoutes from './routes/callRoutes.js';
import postRoutes from './routes/postRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import livestreamRoutes from './routes/livestreamRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const uploadsDirPath = path.resolve(__dirname, '../uploads');
const chatUploadsDirPath = path.join(uploadsDirPath, 'chat');
const communityUploadsDirPath = path.join(uploadsDirPath, 'communities');
if (!fs.existsSync(chatUploadsDirPath)) {
  fs.mkdirSync(chatUploadsDirPath, { recursive: true });
}
if (!fs.existsSync(communityUploadsDirPath)) {
  fs.mkdirSync(communityUploadsDirPath, { recursive: true });
}

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Serve uploaded media files (images, videos, documents)
app.use('/uploads', express.static(uploadsDirPath));

// Serve built frontend assets (never cache index.html so updates appear immediately)
app.use(
  express.static(clientDistPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    },
  })
);

// Health Check API
const getHealthPayload = () => ({
  status: 'ok',
  message: 'MERN backend server is running',
  version: '2.2.1',
  dbConnected: mongoose.connection.readyState === 1,
  dbState: mongoose.connection.readyState,
  dbError: mongoose.connection.readyState === 1 ? null : getLastDbError(),
  chatAvailable: true,
  callAvailable: true,
  postsAvailable: true,
});

app.get('/api/health', (req, res) => {
  res.status(200).json(getHealthPayload());
});
app.get('/health', (req, res) => {
  res.status(200).json(getHealthPayload());
});

// Fast fallback when database is disconnected or connecting (prevents 10000ms buffering timeouts)
app.use(['/api', '/users', '/chat', '/call', '/posts', '/stories', '/communities', '/livestreams'], async (req, res, next) => {
  if (req.path === '/health' || req.path === '/api/health') return next();

  if (mongoose.connection.readyState !== 1 && req.method !== 'GET') {
    await waitForDBConnection(4500);
  }

  if (mongoose.connection.readyState !== 1) {
    if (req.method === 'GET') {
      const fullPath = (req.baseUrl + req.path).toLowerCase();
      if (fullPath.includes('livestream') || fullPath.includes('storie') || fullPath.includes('story') || fullPath.includes('communit')) {
        return next();
      }
      if (fullPath.includes('post')) {
        return res.status(200).json({ success: true, posts: [], offline: true });
      }
      if (fullPath.includes('chat')) {
        return res.status(200).json({ success: true, messages: [], recent: [], conversations: [], offline: true });
      }
      if (fullPath.includes('user')) {
        return res.status(200).json({ success: true, users: [], contacts: [], offline: true });
      }
      if (fullPath.includes('call')) {
        return res.status(200).json({ hasIncoming: false, calls: [], offline: true });
      }
      return res.status(200).json({ success: true, offline: true });
    }
    const fullPath = (req.baseUrl + req.path).toLowerCase();
    if (fullPath.includes('livestream') || fullPath.includes('communit') || fullPath.includes('storie') || fullPath.includes('story')) {
      return next();
    }
    if (fullPath.includes('sync-contacts')) {
      const { contacts = [] } = req.body || {};
      return res.status(200).json({
        success: true,
        totalPhoneContacts: contacts.length,
        registeredCount: contacts.length,
        registeredContacts: contacts.map((c) => ({
          id: c.phone || c.name,
          phoneBookName: c.name,
          username: (c.name || 'user').toLowerCase().replace(/\s+/g, '_'),
          phone: c.phone,
          status: 'Hey there! I am using Planet',
          avatar: c.avatar || null,
          registered: true,
        })),
        nonRegisteredContacts: [],
        offline: true,
      });
    }
    return res.status(503).json({
      success: false,
      message: 'Database is currently connecting or offline. Please check MongoDB Atlas IP whitelist (0.0.0.0/0).',
      error: 'Database is currently connecting or offline. Please check MongoDB Atlas IP whitelist (0.0.0.0/0).',
    });
  }
  next();
});

// Routes (support both /api/* and root-relative /* in case of proxy prefix stripping)
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/chat', chatRoutes);
app.use('/api/call', callRoutes);
app.use('/call', callRoutes);
app.use('/api/posts', postRoutes);
app.use('/posts', postRoutes);
app.use('/api/stories', storyRoutes);
app.use('/stories', storyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/communities', communityRoutes);
app.use('/api/livestreams', livestreamRoutes);
app.use('/livestreams', livestreamRoutes);

// Catch-all for Single Page Application routing (non-API routes)
app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/uploads') ||
    req.path === '/chat' || req.path.startsWith('/chat/') ||
    req.path === '/users' || req.path.startsWith('/users/') ||
    req.path === '/call' || req.path.startsWith('/call/') ||
    req.path === '/posts' || req.path.startsWith('/posts/') ||
    req.path === '/stories' || req.path.startsWith('/stories/') ||
    req.path === '/communities' || req.path.startsWith('/communities/') ||
    req.path === '/livestreams' || req.path.startsWith('/livestreams/')
  ) {
    return next();
  }
  // Never cache index.html so mobile browsers always receive updated bundles immediately
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

let retryPortAttempts = 0;
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    if (retryPortAttempts < 2) {
      retryPortAttempts++;
      console.log(`[Server] Port ${PORT} in use. Automatically freeing port ${PORT} and retrying...`);
      try {
        execSync(`fuser -k ${PORT}/tcp`, { stdio: 'ignore' });
      } catch (_) {}
      setTimeout(() => {
        try {
          server.close();
        } catch (_) {}
        server.listen(PORT, () => {
          console.log(`[Server] Running on http://localhost:${PORT}`);
        });
      }, 1000);
      return;
    }
    console.error(`\n❌ [Server Error] Port ${PORT} is already in use by another process.`);
    console.error(`👉 Run: fuser -k ${PORT}/tcp (or npx kill-port ${PORT}) to free port ${PORT}.\n`);
  } else {
    console.error('[Server Error]', err);
  }
  process.exit(1);
});

// Graceful cleanup so nodemon restarts never leave ports hung
const handleExit = (signal) => {
  try {
    server.close();
  } catch (_) {}
  if (signal === 'SIGUSR2') {
    process.kill(process.pid, 'SIGUSR2');
  } else {
    process.exit(0);
  }
};
process.once('SIGUSR2', () => handleExit('SIGUSR2'));
process.on('SIGINT', () => handleExit('SIGINT'));
process.on('SIGTERM', () => handleExit('SIGTERM'));

server.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
