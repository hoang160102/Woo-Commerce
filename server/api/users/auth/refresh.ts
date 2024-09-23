import jwt from "jsonwebtoken";
import User from "~/models/User.model";
export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken");
  const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshToken) {
    return {
      statusCode: 401,
      message: "Unauthorized",
    };
  }
  const storedToken = await User.findOne({ refreshToken });
  if (!storedToken) {
    return {
      statusCode: 401,
      message: "Unauthorized",
    };
  }
  try {
    const decoded: any = jwt.verify(refreshToken, refreshTokenSecret);
    console.log(decoded)
    // const newAccessToken = jwt.sign(
    //   { userId: decoded.userId },
    //   accessTokenSecret,
    //   { expiresIn: "5m" }
    // );
    // const newRefreshToken = jwt.sign(
    //   { userId: decoded.userId },
    //   refreshTokenSecret,
    //   { expiresIn: "1y" }
    // );
  } catch (err) {
    console.log(err);
  }
});
