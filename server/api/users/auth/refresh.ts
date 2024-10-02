import jwt from "jsonwebtoken";
import User from "~/models/user/User.model";
import { generateRefreshToken } from "~/utils/jwt";
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const refreshToken = cookies.refreshToken;
  const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET
  const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET
  if (!refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'No refresh token provided' });
  }  

  // Verify refresh token
  try {
    const payload: any = jwt.verify(refreshToken, refreshTokenSecret);
    const user: any = await User.findById(payload.userId);
    // console.log(user)
    // if (!user || user.refreshToken !== refreshToken) {
    //   throw createError({ statusCode: 401, statusMessage: 'Invalid refresh token' });
    // }
    console.log(user.refreshToken + 'old token')
    // Tạo access token mới
    const accessToken = user.refreshToken
    // Tạo refresh token mới (giữ nguyên thời hạn)
    const newRefreshToken = generateRefreshToken(user['_id'])

    // Cập nhật refresh token trong cơ sở dữ liệu
    user.refreshToken = newRefreshToken;
    console.log(newRefreshToken + 'newToken')
    await user.save();
    
    return { accessToken, newRefreshToken };
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired refresh token' });
  }
  
});

