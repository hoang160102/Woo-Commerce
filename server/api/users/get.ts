import User from "~/models/user/User.model";
export default defineEventHandler(async (event) => {
  const users = await User.find();
  return {
    users,
  };
});
