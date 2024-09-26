import User from "~/models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "~/utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  // verify email, password
  const user: any = await User.findOne({ email });
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
  const accessToken = generateAccessToken(user['_id'])
  const refreshToken = generateRefreshToken(user['_id'])
  const tokenExpire = new Date()
  tokenExpire.setFullYear(tokenExpire.getFullYear() + 1)
  user.tokenExpire = tokenExpire
  user.refreshToken = refreshToken
  await user.save()
  // setCookie(event, 'accessToken', accessToken, { httpOnly: false, maxAge: 300 }); // 5 phút
  // setCookie(event, 'refreshToken', refreshToken, { httpOnly: false, maxAge: 365 * 24 * 60 * 60 }); // 1 nă
  return { accessToken, refreshToken, ...user }
});
