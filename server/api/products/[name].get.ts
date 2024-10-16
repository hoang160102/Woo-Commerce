import Product from "~/models/Product.model";
export default defineEventHandler(async (event: any) => {
    const { name } = event.context.params
    const product = await Product.findOne({ name: decodeURIComponent(name) })
    return product
})