import mongoose, { Schema, Types, Model } from "mongoose";

interface UserReview {
  userId: Types.ObjectId;
  rate: number;
  comment: string;
  avatar: string;
  username: string;
}

const userReviewSchema = new Schema<UserReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rate: { type: Number },
  comment: { type: String },
  avatar: { type: String },
  username: { type: String }
});

const UserReview: Model<UserReview> = mongoose.model<UserReview>(
  "UserReview",
  userReviewSchema
);
export default UserReview;