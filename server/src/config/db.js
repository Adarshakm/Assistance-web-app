import mongoose from 'mongoose';

// Allow brief transient buffering during reconnects while keeping queries bounded
mongoose.set('bufferTimeoutMS', 10000);
mongoose.set('autoIndex', false);

let isConnecting = false;
let reconnectTimer = null;
let activeConnectPromise = null;
let lastDbError = null;

export const getLastDbError = () => lastDbError;

const scheduleReconnect = (delay = 5000) => {
  if (reconnectTimer || isConnecting || mongoose.connection.readyState === 1) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectDB();
  }, delay);
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (activeConnectPromise) return activeConnectPromise;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  isConnecting = true;
  activeConnectPromise = (async () => {
    try {
      const rawUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_starter';
      const mongoUri = rawUri.includes('?') || !rawUri.startsWith('mongodb+srv://')
        ? rawUri
        : `${rawUri.replace(/\/$/, '')}/assistance?retryWrites=true&w=majority`;

      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 8000,
        connectTimeoutMS: 12000,
        maxIdleTimeMS: 15000,
        heartbeatFrequencyMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 0,
        autoIndex: false,
      });
      lastDbError = null;
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    } catch (error) {
      lastDbError = error?.message || 'MongoDB connection failed';
      const isAtlasWhitelist =
        error?.message?.includes('Could not connect to any servers') ||
        error?.message?.includes('whitelist') ||
        error?.message?.includes('SSL alert number 80') ||
        error?.message?.includes('tlsv1 alert internal error');

      if (isAtlasWhitelist) {
        console.error(
          `\n================================================================================\n` +
          `[MongoDB Atlas Whitelist Required]\n` +
          `MongoDB Atlas refused the connection (SSL Alert 80 / IP Not Whitelisted).\n` +
          `To fix this:\n` +
          `1. Open MongoDB Atlas: https://cloud.mongodb.com\n` +
          `2. Go to "Network Access" under Security\n` +
          `3. Click "Add IP Address"\n` +
          `4. Click "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0) or add your current IP.\n` +
          `================================================================================\n`
        );
      } else {
        console.error(`[MongoDB] Connection error: ${error.message}. Retrying in 5s...`);
      }
      scheduleReconnect(5000);
    } finally {
      isConnecting = false;
      activeConnectPromise = null;
    }
  })();
  return activeConnectPromise;
};

export const waitForDBConnection = async (timeoutMs = 4500) => {
  if (mongoose.connection.readyState === 1) return true;
  const pending = activeConnectPromise || connectDB();
  let timer;
  try {
    await Promise.race([
      pending,
      new Promise((resolve) => {
        timer = setTimeout(resolve, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
  return mongoose.connection.readyState === 1;
};

mongoose.connection.on('connected', () => {
  lastDbError = null;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Attempting to reconnect...');
  scheduleReconnect(3000);
});

mongoose.connection.on('error', (err) => {
  const isSslAlert = String(err?.message || err).includes('SSL alert number 80');
  if (isSslAlert) {
    console.warn('[MongoDB] Atlas rejected SSL handshake (IP not whitelisted in Atlas Network Access).');
  } else {
    console.warn('[MongoDB] Socket notice:', err?.message || err);
  }
  if (mongoose.connection.readyState !== 1) {
    scheduleReconnect(4000);
  }
});

export default connectDB;
