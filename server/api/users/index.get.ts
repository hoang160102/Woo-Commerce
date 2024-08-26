import User from "~/models/User.model";
export default defineEventHandler(async (event) => {
  const users = await User.find();
  return {
    users,
  };
});
