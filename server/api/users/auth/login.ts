import User from "~/models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;
  // verify email, password
  const user = await User.findOne({ email });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found.",
    });
  }
  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Your password is not correct.",
    });
  }
  // check if the account was verified or not
  if (!user.isVerified) {
    throw createError({
      statusCode: 403,
      statusMessage: "Your account has not been verified",
    });
  }
  // create token
  const accessToken = jwt.sign({ userId: user["_id"] }, accessTokenSecret, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign({ userId: user["_id"] }, refreshTokenSecret, {
    expiresIn: "1y",
  });
  const tokenExpire = new Date()
  tokenExpire.setFullYear(tokenExpire.getFullYear() + 1)
  user.tokenExpire = tokenExpire
  user.refreshToken = refreshToken
  await user.save()
  setCookie(event, 'accessToken', accessToken, { httpOnly: true, maxAge: 300 }); // 5 phút
  setCookie(event, 'refreshToken', refreshToken, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 }); // 1 nă
  return { accessToken, refreshToken, user }
});
