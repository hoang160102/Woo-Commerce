import User from "~/models/user/User.model";
import Billing from "~/models/user/Billing.model";
import Shipping from "~/models/user/Shipping.model";
import Cart from "~/models/user/cart/Cart.model";
import { generateRefreshToken } from "~/utils/jwt";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userAccount } = body;
  const newBilling = new Billing({});
  const newShipping = new Shipping({});
  const newCart = new Cart({});
  let user: any = await User.findOne({ email: userAccount.email });
  const tokenExpire = new Date()
  tokenExpire.setFullYear(tokenExpire.getFullYear() + 1)
  if (!user) {
    user = new User({
      name: userAccount.name,
      username: userAccount.name,
      email: userAccount.email,
      phone: "",
      billing: newBilling["_id"],
      shipping: newShipping["_id"],
      cart: newCart["_id"],
      profile_img: userAccount.picture,
      isVerified: userAccount.email_verified,
      tokenExpire,
      password: '',
      refreshToken: generateRefreshToken(userAccount.id)
    });
    await newBilling.save()
    await newShipping.save()
    await newCart.save()
    await user.save()
  }
  else {
    user.refreshToken = generateRefreshToken(userAccount.id)
    await user.save()
  }
  return user
});
