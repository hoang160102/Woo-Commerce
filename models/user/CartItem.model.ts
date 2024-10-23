import { Schema, model, Document, Types } from 'mongoose';

interface ICartItem extends Document {
  product_id: Types.ObjectId;
  product_item_id: Types.ObjectId;
  qty: number;
}

const cartItemSchema = new Schema<ICartItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  product_item_id: { type: Schema.Types.ObjectId, required: true },
  qty: { type: Number, required: true, min: 1 },
});

export default model<ICartItem>('CartItem', cartItemSchema);
