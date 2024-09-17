import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "~/models/User.model";
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
    const token = crypto.randomBytes(16).toString("hex");
    const expireAt = new Date(Date.now() + 3600000);
    const newUser = new User({
      ...body,
      password: hashedPassword,
      verificationToken: token,
      expireAt,
    });
    await newUser.save();
    const verificationLink = `${event.req.headers.origin}/verify?token=${token}`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP host
      port: 587, // Replace with your SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USERNAME, // Replace with your email
        pass: process.env.NODEMAILER_PASSWORD, // Replace with your email password
      },
    });
    console.log( {
      user: process.env.NODEMAILER_USERNAME, // Replace with your email
      pass: process.env.NODEMAILER_PASSWORD, // Replace with your email password
    })
    console.log(event.req.headers.origin)
    const mailOptions = {
      from: "hoang160102@gmail.com",
      to: body.email,
      subject: "Verify your email address",
      html: `<p class="text-gray-500">Click the following link to verify your email address:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };
    await transporter.sendMail(mailOptions)
  } catch (err: any) {
    if (err.statusCode) {
      throw err;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: err.message,
      });
    }
  }
});
