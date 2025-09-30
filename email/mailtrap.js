const { MailtrapClient } = require("mailtrap");

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sendEmail = async (options) => {
  await mailtrapClient.send({
    from: {
      email: "hello@demomailtrap.co",
      name: "DawnEats",
    },
    to: [{ email: options?.email }],
    subject: options?.subject,
    text: options?.message,
    category: options?.category,
    html: options?.html,
  });
};
module.exports = { mailtrapClient, sendEmail };
