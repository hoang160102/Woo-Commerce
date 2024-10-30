import User from "~/models/user/User.model";
import UserReview from "~/models/user/UserReview.model";
import Product from "~/models/Product.model";
export default defineEventHandler(async (event: any) => {
    const body = await readBody(event)
    const { userId, rate, comment, avatar, username } = body
    const id: any = event.context.params.id
    let product: any = await Product.findById(id).populate('reviews')
    const userReview = new UserReview({
        userId,
        rate,
        comment,
        avatar,
        username,
    })
    await userReview.save()
    product.reviews.push(userReview)
    await product.save()
    return product
})