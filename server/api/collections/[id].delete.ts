import Collection from "~/models/Collection.model"
export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    try {
        const deleteItem = await Collection.findByIdAndDelete(id)
    } catch(err) {
        console.log(err)
    }
})