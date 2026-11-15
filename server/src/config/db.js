import mongoose from 'mongoose';

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_starter';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 7000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}. Retrying in 5s...`);
    setTimeout(connectDB, 5000);
  } finally {
    isConnecting = false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Attempting to reconnect...');
  setTimeout(connectDB, 3000);
});

export default connectDB;
