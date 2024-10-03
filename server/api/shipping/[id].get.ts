import Shipping from "~/models/user/Shipping.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const shipping = await Shipping.findById(id)
    return shipping
})