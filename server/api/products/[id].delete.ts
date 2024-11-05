import Product from "~/models/Product.model";
import UserReview from "~/models/user/UserReview.model";
export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  try {
    const deleteProd = await Product.findByIdAndDelete(id);
    const deleteReviews = await UserReview.deleteMany({ productId: id})
  } catch (err) {
    console.log(err)
  }
});
