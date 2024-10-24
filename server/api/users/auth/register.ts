import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "~/models/user/User.model";
import Billing from "~/models/user/Billing.model";
import Shipping from "~/models/user/Shipping.model";
import Cart from "~/models/user/cart/Cart.model";
import sendEmailVerification from "~/utils/sendEmailVerification";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const existingUser = await User.findOne({ email: body.email });
  try {
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is already used",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newBilling = new Billing({})
    const newShipping = new Shipping({})
    const newCart = new Cart({})
    const token = crypto.randomBytes(16).toString("hex");
    const expireAt = new Date(Date.now() + 3600000);
    const newUser = new User({      
      ...body,
      password: hashedPassword,
      verificationToken: token,
      billing: newBilling._id,
      shipping: newShipping._id,
      cart: newCart['_id'],
      expireAt,
    });
    await newBilling.save()
    await newShipping.save()
    await newCart.save()
    await newUser.save();
    const verificationLink = `${event.req.headers.origin}/verify?auth=${token}`;
    await sendEmailVerification(body.email, body.name, verificationLink)
  } catch (err: any) {
    if (err.statusCode) {
      throw err;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: err.message,
      });
    }
  }
});
