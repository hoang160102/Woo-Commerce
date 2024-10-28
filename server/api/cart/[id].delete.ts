import CartItem from "~/models/user/cart/CartItem.model";
import Cart from "~/models/user/cart/Cart.model";
export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  let cart: any = await Cart.findById(id).populate("items");
  const itemIds = cart.items.map((item: any) => item._id);
  if (body) {
    const { itemId } = body;
    cart.items = cart.items.filter(
      (item: any) => item["_id"].toString() !== itemId
    );
    await CartItem.findByIdAndDelete(itemId);
  } else {
    cart.items = [];
    await CartItem.deleteMany({ _id: { $in: itemIds } });
  }
  await cart.save();
  return cart;
});
