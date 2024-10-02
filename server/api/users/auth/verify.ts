import User from "~/models/user/User.model";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { token } = query;
  const user = await User.findOne({ verificationToken: token });
  try {
    if (!user) {
      return { success: false, message: "Your account has been verified" };
    }
    const currentTime = new Date();
    if (user.expireAt < currentTime) {
      return {
        success: false,
        message:
          "Token has expired. Please resend link to re-verify your account",
      };
    }
    // Mark the user as verified and remove the token
    user.isVerified = true;
    user.verificationToken = undefined as unknown as string;
    user.expireAt = undefined as unknown as Date;
    await user.save();
    return {
      success: true,
      message: "Your Account has been verified. Now you can login",
    };
  } catch (error) {
    console.log(error);
    return { 
      statusCode: 500,
      body: { message: "An error occurred during verification." },
    };
  }
});
