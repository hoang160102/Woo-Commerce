import User from "~/models/user/User.model";
import UserReview from "~/models/user/UserReview.model";
import Product from "~/models/Product.model";
export default defineEventHandler(async (event: any) => {
// const possibleRatings = [1, 2, 3, 4, 5];
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
    let totalRating = product.reviews.reduce((sum: number, review: any) => {
        return sum + review.rate
    }, 0)
    let averageRating = totalRating / product.reviews.length
    product.rating = averageRating
    await product.save()
    return product
})