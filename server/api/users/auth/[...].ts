import bcrypt from "bcrypt";
import User from "~/models/User.model";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    if (event.req.method === "POST") {
      if (event.req.url?.includes("register")) {
        console.log(2)
        const hashedPassword = await bcrypt.hash(body.password, 10);
        console.log(1)
        const newUser = new User({
          ...body,
          password: hashedPassword,
        });
        console.log(newUser);
        
        await newUser.save();
        console.log(newUser);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
