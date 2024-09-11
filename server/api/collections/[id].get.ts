import Collection from "~/models/Collection.model"
export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const cate = await Collection.findById(id)
    return { cate }
})