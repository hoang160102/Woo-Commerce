import mongoose, { Document, Model, Schema, Types } from "mongoose";
// import { v4 as uuidv4} from "uuid"

interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing: Types.ObjectId;
  shipping: Types.ObjectId;
  cart: Types.ObjectId;
  createAt: Date;
  updatedAt: Date;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
  isAdmin: boolean
  verificationToken: string;
  expireAt: Date;
}

const userSchema: Schema<User> = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  billing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Billing",
  },
  shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipping",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  createAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  orders: { type: [String], default: [] },
  profile_img: { type: String, default: "" },
  wishList: { type: [String], default: [] },
  refreshToken: { type: String, default: "" },
  tokenExpire: { type: Date },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  verificationToken: { type: String },
  expireAt: { type: Date },
});
const User: Model<User> = mongoose.model<User>("User", userSchema);
export default User;
