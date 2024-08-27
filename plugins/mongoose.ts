import mongoose from 'mongoose';

export default defineNuxtPlugin(async () => {
  // Check if Mongoose is already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // MongoDB connection string
  const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/Woo-Commerce';

  // Connect to MongoDB
  await mongoose.connect(url)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
});
