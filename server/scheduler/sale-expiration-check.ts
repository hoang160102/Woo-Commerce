import schedule from 'node-schedule';
import Product from '~/models/Product.model'; // Adjust path to your product model

export default defineNitroPlugin(() => {
  // Schedule the job to run every day at midnight (00:00)
  schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    console.log('run')
    try {
      // await Product.updateMany(
      //   { saleExpiration: { $type: 'string' } },
      //   [ { $set: { saleExpiration: { $toDate: "$saleExpiration" } } } ]
      // );
      // Find and update all products where the sale has expired
      // const result = await Product.updateMany(
      //   { saleExpiration: { $lt: currentDate }, sale: { $gt: 0 } },
      //   { $set: { sale: 0 } }
      // );
      // console.log(result)
      const products = await Product.find()
      products.forEach(async (product: any) => {
        if (product.saleExpiration < currentDate && product.saleExpiration !== null) {
          product.saleExpiration = null
          product.sale = 0
          const newProduct = new Product(product)
          console.log(newProduct)
          await newProduct.save()
        }
      })
      console.log('Checked and updated expired sales.');
    } catch (error) {
      console.error('Error updating expired sales:', error);
    }
  });
});