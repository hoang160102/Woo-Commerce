import Category from "~/models/Category.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const cate = await Category.findById(id)
    return { cate }
})