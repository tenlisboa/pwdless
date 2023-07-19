'use strict';

const { sendOTPTo, verifyOTPFrom } = require('../src/lib/main');
const Config = require('../src/lib/config');

require('dotenv-safest').config();

Config.setup({
  mailer: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  otp: {
    length: 6,
    ttl: 2,
  },
});

sendOTPTo({
  to: 'gabriellisboa.rx@gmail.com',
})
  .then((otp) => {
    console.log('OTP sent');

    verifyOTPFrom({
      from: 'gabriellisboa.rx@gmail.com',
      code: otp,
    })
      .then((response) => {
        console.log('OTP verified');
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
