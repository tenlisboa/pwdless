const nodemailer = require('nodemailer');

const SendEmailOptions = {
  from: '',
  to: '',
  text: null,
  html: null,
};

async function sendEmail({ from, to, text, html } = SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail({
    from,
    to,
    text,
    html,
  });
}

module.SendEmailOptions = SendEmailOptions;

module.exports = sendEmail;
