import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import callRoutes from './routes/callRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve built frontend assets
app.use(express.static(clientDistPath));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'MERN backend server is running',
    version: '2.2.1',
    chatAvailable: true,
    callAvailable: true,
    postsAvailable: true,
  });
});
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'MERN backend server is running',
    version: '2.2.1',
    chatAvailable: true,
    callAvailable: true,
    postsAvailable: true,
  });
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

// Catch-all for Single Page Application routing (non-API routes)
app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/chat') ||
    req.path.startsWith('/users') ||
    req.path.startsWith('/call') ||
    req.path.startsWith('/posts')
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

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ [Server Error] Port ${PORT} is already in use by another process.`);
    console.error(`👉 Run: fuser -k ${PORT}/tcp (or npx kill-port ${PORT}) to free port ${PORT}.\n`);
  } else {
    console.error('[Server Error]', err);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
