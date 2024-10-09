import schedule from 'node-schedule';
import mongoose from 'mongoose';
import Product from '~/models/Product.model'; // Adjust path to your product model

export default defineNitroPlugin(() => {
  // Schedule the job to run every day at midnight (00:00)
  schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    console.log('run')
    try {
      // Find and update all products where the sale has expired
      await Product.updateMany(
        { saleExpiration: { $lt: currentDate }, sale: { $gt: 0 } },
        { $set: { sale: 0 } }
      );
      console.log('Checked and updated expired sales.');
    } catch (error) {
      console.error('Error updating expired sales:', error);
    }
  });
});