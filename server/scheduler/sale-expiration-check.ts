import schedule from 'node-schedule';
import Product from '~/models/Product.model'; // Adjust path to your product model

export default defineNitroPlugin(() => {
  // Schedule the job to run every day at midnight (00:00)
  schedule.scheduleJob('0 */2 * * *', async () => {
    const currentDate = new Date();
    console.log('run')
    try {
      const products = await Product.find()
      products.forEach(async (product: any) => {
        if (product.saleExpiration < currentDate && product.saleExpiration !== null) {
          product.saleExpiration = null
          product.sale = 0
          const newProduct = new Product(product)
          await newProduct.save()
        }
      })
      console.log('Checked and updated expired sales.');
    } catch (error) {
      console.error('Error updating expired sales:', error);
    }
  });
});