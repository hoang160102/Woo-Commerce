import Collection from "~/models/Collection.model";
export default defineEventHandler(async (event) => {
    const collections = await Collection.find()
    return { collections }
})
