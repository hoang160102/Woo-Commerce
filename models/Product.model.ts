import mongoose, { Collection, Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface Product {
  name: string;
  category: string;
  productCollection: string[];
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
  rating: number;
  reviews: object[]
}
const productSchema: Schema<Product> = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  productCollection: { type: [String], required: true },
  gender: { type: String, required: true },
  quanity: { type: Number, required: true },
  price: { type: Number, required: true },
  sale: { type: Number, default: 0 },
  saleExpiration: { type: Date, default: null },
  color: { type: [String], required: true },
  size: { type: [String], required: true },
  description: { type: String, required: true },
  product_images: { type: [String], required: true },
  createdAt: { type: String, default: dateToString() },
  updatedAt: { type: String, default: dateToString() },
  rating: { type: Number, default: 0 },
  reviews: { type: [Object], default: [] }
});
const Product: Model<Product> = mongoose.model<Product>(
  "Product",
  productSchema
);
export default Product
