import mongoose from 'mongoose';

// Fail fast on disconnected queries instead of buffering for 10000ms
mongoose.set('bufferTimeoutMS', 2500);

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;
  try {
    const rawUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_starter';
    const mongoUri = rawUri.includes('?') || !rawUri.startsWith('mongodb+srv://')
      ? rawUri
      : `${rawUri.replace(/\/$/, '')}/assistance?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 15,
      minPoolSize: 1,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
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
    setTimeout(connectDB, 5000);
  } finally {
    isConnecting = false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Attempting to reconnect...');
  setTimeout(connectDB, 3000);
});

mongoose.connection.on('error', (err) => {
  const isSslAlert = String(err?.message || err).includes('SSL alert number 80');
  if (isSslAlert) {
    console.warn('[MongoDB] Atlas rejected SSL handshake (IP not whitelisted in Atlas Network Access).');
  } else {
    console.warn('[MongoDB] Socket notice:', err?.message || err);
  }
  if (mongoose.connection.readyState !== 1) {
    setTimeout(connectDB, 4000);
  }
});

export default connectDB;
