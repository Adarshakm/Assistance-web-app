import mongoose from 'mongoose';

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_starter';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 20000,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 15,
      minPoolSize: 1,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}. Retrying in 4s...`);
    setTimeout(connectDB, 4000);
  } finally {
    isConnecting = false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Attempting to reconnect...');
  setTimeout(connectDB, 2000);
});

mongoose.connection.on('error', (err) => {
  console.warn('[MongoDB] Socket notice:', err?.message || err);
  if (mongoose.connection.readyState !== 1) {
    setTimeout(connectDB, 1500);
  }
});

export default connectDB;
