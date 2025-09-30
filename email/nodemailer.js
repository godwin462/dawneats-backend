const nodemailer = require("nodemailer");
const NodemailerHelper = require("nodemailer-otp");

const transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 587,
  // secure: false,
  // host: "smtp.gmail.com",
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASS,
  },
  // connectionTimeout: 5 * 60 * 1000,
});

const sendEmail = async (options) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text, // plain‑text body
    html: options.html, // HTML body
  });

  // console.log("Message sent:", info.messageId);
};
const nodemailerOtpHelper = new NodemailerHelper(
  process.env.EMAIL,
  process.env.MAIL_PASS
);

module.exports = { transporter, sendEmail, nodemailerOtpHelper };
