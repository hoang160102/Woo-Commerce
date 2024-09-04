import mongoose, { Model, Schema } from "mongoose";
function dateToString() {
  const timestamp = Date.now(); // Current timestamp
  const date = new Date(timestamp); // Convert to Date object

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate; // Output: "29 Aug 2024"
}
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
