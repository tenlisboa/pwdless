const nodemailer = require('nodemailer');
const { getConfig } = require('../lib/config');

const SendEmailOptions = {
  from: '',
  to: '',
  text: null,
  html: null,
};

async function sendEmail({ from, to, text, html } = SendEmailOptions) {
  const mailer = getConfig().mailer;

  const transporter = nodemailer.createTransport(mailer);

  transporter.sendMail({
    from,
    to,
    text,
    html,
  });
}

module.SendEmailOptions = SendEmailOptions;

module.exports = sendEmail;
