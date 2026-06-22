import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/next_labs_db";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection built perfectly.");
  } catch (error) {
    console.error("Database connection fault:", error);
  }
}
