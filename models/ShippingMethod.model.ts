import mongoose, { Model, Schema } from "mongoose";
import dateToString from "~/composables/useDate";

interface ShippingMethod {
  name: string;
  price: number;
  createdAt: String
  updatedAt: String
}

const shippingMethodSchema: Schema<ShippingMethod> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: String, default: dateToString() },
  updatedAt: { type: String, default: dateToString() }
});

const ShippingMethod: Model<ShippingMethod> = mongoose.model<ShippingMethod>(
    "ShippingMethod",
    shippingMethodSchema
)

export default ShippingMethod