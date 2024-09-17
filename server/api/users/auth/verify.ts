import User from "~/models/User.model";

export default defineEventHandler(async (event) => {
  const { token } = useQuery(event);  // Get the token from the query parameter

  // Find the user with the matching verification token
  const user = await User.findOne({
    verificationToken: token,
    expireAt: { $gt: new Date() }, // Check if the token is still valid (not expired)
  });

  if (!user) {
    return { success: false, message: 'Invalid or expired token' };
  }

  // Mark the user as verified and remove the token
  user.isVerified = true;
  user.verificationToken = undefined as unknown as string;
  user.expireAt = undefined as unknown as Date; 

  await user.save();

  return { success: true, message: 'Email successfully verified!' };
});
