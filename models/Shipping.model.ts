import mongoose, { Collection, Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface Shipping {
  name: string;
  price: number;
  createdAt: String
}

const shippingSchema: Schema<Shipping> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: String, default: dateToString()}
});

const Shipping: Model<Shipping> = mongoose.model<Shipping>(
    "Shipping",
    shippingSchema
)

export default Shipping