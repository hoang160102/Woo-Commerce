import { Schema, model } from 'mongoose';
interface User {
    firstName: string;
    lastName: string;
    username: string
    password: string;
    billing_info_id: string;
    shipping_info_id: string;
    createAt: Date;
    updatedAt: Date;
    orders: string[];
    profile_img: string;
    wishList: string[];
}
const userSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    billing_info_id: { type: String, required: true },
    shipping_info_id: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    orders: { type: [String], default: [] },
    profile_img: { type: String, required: true },
    wishList: { type: [String], default: [] }
});
const User = model<User>('User', userSchema);
export default User

