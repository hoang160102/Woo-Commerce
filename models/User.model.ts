import mongoose, { Document, Model, Schema} from "mongoose";
import { v4 as uuidv4} from "uuid"

interface User {
    name: string,
    username: string
    password: string;
    email: string;
    phone: string;
    billing_info_id: string;
    shipping_info_id: string;
    createAt: Date;
    updatedAt: Date;
    orders: string[];
    profile_img: string;
    wishList: string[];
    refreshToken: string;
    isVerified: boolean
    verificationToken: string
    expireAt: Date
}
const userSchema: Schema<User> = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: String, required: true},
    billing_info_id: { type: String, default: () => uuidv4() },
    shipping_info_id: { type: String, default: () => uuidv4() },
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    orders: { type: [String], default: [] },
    profile_img: { type: String, default: '' },
    wishList: { type: [String], default: [] },
    refreshToken: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: true },
    expireAt: { type: Date }
});
const User: Model<User> = mongoose.model<User>('User', userSchema);
export default User

