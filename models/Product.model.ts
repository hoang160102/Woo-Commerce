import mongoose, { Collection, Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface Product {
  name: string;
  category: string;
  collection: string;
  gender: string;
  quanity: number;
  price: number;
  sale: number;
  saleExpiration: Date | null;
  color: string[];
  size: string[];
  description: string;
  product_images: string[];
  createdAt: string;
  updatedAt: string;
}
const productSchema: Schema<Product> = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  collection: { type: String, required: true },
  gender: { type: String, required: true },
  quanity: { type: Number, required: true },
  sale: { type: Number, default: 0 },
  saleExpiration: { type: Date, default: null },
  color: { type: [String], required: true },
  size: { type: [String], required: true },
  description: { type: String, required: true },
  product_images: { type: [String], required: true },
  createdAt: { type: String, default: dateToString() },
  updatedAt: { type: String, default: dateToString() },
});
const Product: Model<Product> = mongoose.model<Product>(
  "Product",
  productSchema
);
export default Product
