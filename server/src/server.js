import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'MERN backend server is running',
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io Real-time Event Handlers
const activeSockets = new Map(); // username -> Set of socket ids

io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('join', (username) => {
    if (!username) return;
    const cleanUser = String(username).trim().toLowerCase();
    currentUser = cleanUser;

    // Join all normalized variations of username so messages always route
    socket.join(cleanUser);
    const noSpace = cleanUser.replace(/\s+/g, '');
    if (noSpace && noSpace !== cleanUser) socket.join(noSpace);
    const firstWord = cleanUser.split(' ')[0];
    if (firstWord && firstWord !== cleanUser) socket.join(firstWord);
    const rawUser = String(username).trim();
    if (rawUser && rawUser !== cleanUser) socket.join(rawUser);

    if (!activeSockets.has(cleanUser)) {
      activeSockets.set(cleanUser, new Set());
    }
    activeSockets.get(cleanUser).add(socket.id);

    // Notify peers that user is online
    io.emit('user:status', { username: cleanUser, status: 'Online' });
  });

  socket.on('typing', ({ receiver, isTyping }) => {
    if (receiver && currentUser) {
      const cleanReceiver = String(receiver).trim().toLowerCase();
      const targets = new Set([
        cleanReceiver,
        cleanReceiver.replace(/\s+/g, ''),
        cleanReceiver.split(' ')[0],
        String(receiver).trim(),
      ]);
      for (const target of targets) {
        if (target) {
          io.to(target).emit('chat:typing', {
            sender: currentUser,
            isTyping: Boolean(isTyping),
          });
        }
      }
    }
  });

  socket.on('disconnect', () => {
    if (currentUser && activeSockets.has(currentUser)) {
      const userSockets = activeSockets.get(currentUser);
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        activeSockets.delete(currentUser);
        io.emit('user:status', { username: currentUser, status: 'Offline' });
      }
    }
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
