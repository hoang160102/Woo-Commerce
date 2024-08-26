import mongoose from 'mongoose';

export default defineNuxtPlugin(async () => {
  // Check if Mongoose is already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // MongoDB connection string
  const url = process.env.MONGODB_URI || 'mongodb+srv://hoang123:<db_password>@cluster0.thcnq.mongodb.net/';

  // Connect to MongoDB
  await mongoose.connect(url, {
    serverSelectionTimeoutMS: 30000
  },)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
});
