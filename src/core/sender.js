const nodemailer = require('nodemailer');

const SendEmailOptions = {
  from: '',
  to: '',
  text: null,
  html: null,
};

async function sendEmail({ options, config } = SendEmailOptions) {
  const { from, to, text, html } = options;

  const transporter = nodemailer.createTransport(config.mailer);

  transporter.sendMail({
    from,
    to,
    text,
    html,
  });
}

module.SendEmailOptions = SendEmailOptions;

module.exports = sendEmail;
