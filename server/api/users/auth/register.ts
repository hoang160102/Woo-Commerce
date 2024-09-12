import bcrypt from "bcrypt";
import User from "~/models/User.model";
import generateUuid from "~/utils/generate-uuid";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const existingUser = await User.findOne({ email: body.email });
  try {
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is already used",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User({
      ...body,
      password: hashedPassword,
      verificationCode: generateUuid(6),
      verificationCodeExpAt: new Date(Date.now() + 10 * 60 * 1000)
    });
    await newUser.save();
  } catch (err: any) {
    if (err.statusCode) {
      throw err;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "An unexpected error occurred",
      });
    }
  }
});
