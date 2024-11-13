import User from "~/models/user/User.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const user = await User.findById(id)
    return user
})