const nodemailer = require("nodemailer");

exports.sendEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
      },
    });

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
console.log("User:", process.env.MAILGUN_DOMAIN_NAME);
console.log(
  "Pass:",
  process.env.MAILGUN_SMTP_PASSWORD ? "Loaded ✅" : "Missing ❌"
);
