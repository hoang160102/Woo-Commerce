import nodemailer from "nodemailer";
import verificationEmailTemplate from "~/server/templates/verificationTemplates";
export default async function sendEmailVerification(
  email: string,
  name: string,
  link: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: "2001140025@s.hanu.edu.vn",
    to: email,
    subject: "Verify your email address",
    html: verificationEmailTemplate(name, link)
  };
  await transporter.sendMail(mailOptions);
}
