 import bcrypt from "bcrypt";
import cookieParser from "cookie-parser"
import User from "~/models/user/User.model";
import jwt from "jsonwebtoken"
export default defineEventHandler(async (event) => {
  // const body = await readBody(event);
  // const existingUser = await User.findOne({ email: body.email })
  // try {
  //   if (event.req.method === "POST") {
  //     if (event.req.url?.includes("register")) {
  //       if(existingUser) {
  //         throw new Error('Email is already used')
  //       }
  //       const hashedPassword = await bcrypt.hash(body.password, 10);
  //       const newUser = new User({
  //         ...body,
  //         password: hashedPassword,
  //       });
  //       console.log(newUser)
  //       // await newUser.save();
  //     }
  //     if (event.req.url?.includes("login")) {
  //       const user = await User.findOne({ email: body.email })
  //       if (!user) {
  //         throw new Error('Your email is not correct')
  //       }
  //       const isMatchPassword = await bcrypt.compare(body.password, user.password)
  //       if (!isMatchPassword) {
  //         throw new Error('Your password is not correct')
  //       }
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});
