import mongoose, { Schema, Types, Model } from "mongoose";

interface UserReview {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rate: number;
  comment: string;
  avatar: string;
  username: string;
  createdAt: Date;
}

const userReviewSchema = new Schema<UserReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rate: { type: Number },
  comment: { type: String },
  avatar: { type: String },
  username: { type: String },
  createdAt: { type: Date, default: Date.now() }

});

const UserReview: Model<UserReview> = mongoose.model<UserReview>(
  "UserReview",
  userReviewSchema
);
export default UserReview;
