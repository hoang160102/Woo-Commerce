import mongoose, { Schema, Types, Model } from 'mongoose';

interface CartItem {
  product_id: Types.ObjectId;
  qty: number;
  color: string;
  size: string;
  cartId: string;
  price: number;
  sale: number
}

const cartItemSchema = new Schema<CartItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 0 },
  cartId: { type: String, required: true },
  color: { type: String, },
  size: { type: String, },
  price: { type: Number },
  sale: { type: Number }
});

const CartItem: Model<CartItem> = mongoose.model<CartItem>('CartItem', cartItemSchema)
export default CartItem
