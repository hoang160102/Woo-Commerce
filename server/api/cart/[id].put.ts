import CartItem from "~/models/user/cart/CartItem.model";
import Cart from "~/models/user/cart/Cart.model";
export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  const { productId, color, size, qty, price } = body;
  let cart: any = await Cart.findById(id).populate('items');
  const existingItem: any = cart?.items.find((item: any) => {
    return (
      item.product_id.toString() === productId &&
      item.color === color &&
      item.size === size
    );
  });
  if (color && size) {
    if (!existingItem) {
      const cartItem = new CartItem({
        product_id: productId,
        cartId: id,
        color,
        size,
        qty,
        price
      });
      await cartItem.save();
      cart?.items.push(cartItem);
    }
    else {
      existingItem.qty += qty
      const cartItem = await CartItem.findByIdAndUpdate(existingItem._id, {
        ...existingItem,
        qty: existingItem.qty
      })
      await cartItem?.save()
    }
  }
  else {
    const cartItem = await CartItem.findByIdAndUpdate(productId, { qty });
    cart.items = cart.items.map((item: any) =>
      item._id.toString() === productId ? { ...item, qty } : item
    );
  }
  await cart?.save();
  console.log(cart)
  return cart;
});
