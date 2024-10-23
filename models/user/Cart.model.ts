import { Schema, model, Document, Types } from 'mongoose';
import CartItem, { ICartItem } from './cartItem';

interface ICart extends Document {
  user_id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  items: { type: [CartItem.schema], default: [] },
});

export default model<ICart>('Cart', cartSchema);
