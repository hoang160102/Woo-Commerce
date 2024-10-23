import Product from "~/models/Product.model";
export default defineEventHandler(async () => {
  const products = await Product.find();
  return {
    products,
  };
});
