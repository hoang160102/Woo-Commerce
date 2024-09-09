import mongoose, { Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface Category {
  name: string;
  image: string;
  createdAt: string;
  updatedAt: String;
  productItems: object[];
}
const categorySchema: Schema<Category> = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: String, default: dateToString() },
  updatedAt: { type: String, default: dateToString() },
  productItems: { type: [Object], default: [] },
});
const Category: Model<Category> = mongoose.model<Category>(
  "Category",
  categorySchema
);
export default Category;
