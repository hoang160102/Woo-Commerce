import Product from "~/models/Product.model";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let products;
  let total;
  if (query.page) {
    const page = Number(query.page || "0");
    const size = Number(query.size || "16");
    products = await Product.find()
      .skip(page * size)
      .limit(size);
    total = await Product.countDocuments();
  } else {
    products = await Product.find();
  }
  return {
    products,
    total,
  };
});
