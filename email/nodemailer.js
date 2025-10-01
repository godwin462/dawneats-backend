const nodemailer = require("nodemailer");
const NodemailerHelper = require("nodemailer-otp");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: `DawnEats <${process.env.EMAIL}`,
      to: user.email,
      subject: user.subject,
      html: user.html,
    });

    console.log(`Message sent : ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`error sending email: ${error.message}`);
    throw error;
  }
};

const nodemailerOtpHelper = new NodemailerHelper(
  process.env.EMAIL,
  process.env.MAIL_PASS
);

module.exports = { transporter, sendEmail, nodemailerOtpHelper };
