import mongoose, { Schema, Model, Types } from 'mongoose';
import CartItem from './CartItem.model';
interface Cart {
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}

const cartSchema = new Schema<Cart>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  items: { type: [CartItem.schema], default: [] },
});

const Cart: Model<Cart> = mongoose.model<Cart>('Cart', cartSchema)
export default Cart
