import mongoose from 'mongoose';

let isConnected = false;

export async function connectDatabase() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] No MONGO_URI configured in env. Utilizing in-memory simulated fallback storage.');
    return;
  }

  try {
    console.log('[Database] Connecting to MongoDB database...');
    // Simple 5s timeout to prevent hanging startup
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[Database] MongoDB connection established successfully.');
  } catch (err) {
    console.error('[Database] Failed to connect to MongoDB, falling back to local simulated memory:', err.message);
  }
}

export function getMongooseConnectionState() {
  return isConnected && mongoose.connection.readyState === 1;
}
