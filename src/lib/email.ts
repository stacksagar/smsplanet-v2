import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: true,
  auth: {
    user: process.env.GOOGLE_SMTP_NAME, // Your Gmail address
    pass: process.env.GOOGLE_SMTP_PASSWORD, // Your Gmail app password (not your account password)
  },
  service: "gmail",
  from: process.env.GOOGLE_SMTP_NAME,
});

export default transporter;
