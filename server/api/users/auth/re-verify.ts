import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "~/models/user/User.model";
import sendEmailVerification from "~/utils/sendEmailVerification";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user: any = await User.findOne({ email: body.email });
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
  }
  if (user.isVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already verified",
    });
  }
  if (user.verificationToken) {
    const newToken = crypto.randomBytes(16).toString("hex");
    const newVerificationLink = `${event.req.headers.origin}/verify?auth=${newToken}`;
    user.verificationToken = newToken;
    user.expireAt = new Date(Date.now() + 3600000);
    await user.save()
    await sendEmailVerification(body.email, user.name, newVerificationLink)
  }
});
