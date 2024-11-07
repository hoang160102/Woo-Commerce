// server/api/products/search.ts
import { defineEventHandler } from 'h3';
import Product from '~/models/Product.model';

export default defineEventHandler(async (event) => {
  const { keyword } = getQuery(event)

  if (!keyword || typeof keyword !== 'string') {
    return {
      statusCode: 400,
      message: 'Keyword is required',
    };
  }

  try {
    // Search for products matching the keyword in either the name or description fields
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    return {
      statusCode: 200,
      products,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'An error occurred while searching for products',
    };
  }
});
