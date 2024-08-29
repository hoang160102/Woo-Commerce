import Category from "~/models/Category.model";
export default defineEventHandler(async (event) => {
  const categories = await Category.find();
  return {
    categories,
  };
});
