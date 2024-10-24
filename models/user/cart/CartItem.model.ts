import mongoose, { Schema, Types, Model } from 'mongoose';

interface CartItem {
  product_id: Types.ObjectId;
  qty: number;
  color: string;
  size: string;
  cartId: string
}

const cartItemSchema = new Schema<CartItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1 },
  cartId: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true }
});

const CartItem: Model<CartItem> = mongoose.model<CartItem>('CartItem', cartItemSchema)
export default CartItem
