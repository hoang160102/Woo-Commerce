import User from "~/models/User.model";
export default defineEventHandler(async (event) => {
  const { refreshToken } = parseCookies(event);
  if (refreshToken) {
    const user: any = await User.findOne({ refreshToken });
    user.refreshToken = null;
    await user.save();
    deleteCookie(event, 'accessToken')
    deleteCookie(event, 'refreshToken')
  }
});
