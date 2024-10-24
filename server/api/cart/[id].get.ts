import Cart from "~/models/user/cart/Cart.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const cart = await Cart.findById(id).populate('items')
    return cart
})