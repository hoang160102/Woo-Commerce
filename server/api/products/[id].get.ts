import Product from "~/models/Product.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const product = await Product.findById(id)
    return product
})