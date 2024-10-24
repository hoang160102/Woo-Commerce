import CartItem from "~/models/user/cart/CartItem.model";
import Cart from "~/models/user/cart/Cart.model";
export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  const { productId, color, size, qty } = body;
  let cart = await Cart.findById(id);
  const existingItem = cart?.items.find((item: any) => {
    return item.product_id === productId && item.color === color && item.size === size;
  });
  console.log(!existingItem)
  if (!existingItem) {
    const cartItem = new CartItem({
        product_id: productId,
        cartId: id,
        color,
        size,
        qty
    })
    await cartItem.save()
    cart?.items.push(cartItem)
  }
  await cart?.save()
  return cart
});
