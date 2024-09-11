import mongoose, { Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface Collection {
  name: string;
  image: string;
  createdAt: string;
  updatedAt: String;
  productItems: object[];
}
const collectionSchema: Schema<Collection> = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: String, default: dateToString() },
  updatedAt: { type: String, default: dateToString() },
  productItems: { type: [Object], default: [] },
});
const Collection: Model<Collection> = mongoose.model<Collection>(
  "Collection",
  collectionSchema
);
export default Collection;
