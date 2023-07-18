'use strict';

const verifyOTPFrom = require('../src/lib/verifyOTPFrom');

const sendOTPTo = require('../src/lib/sendOTPTo');

require('dotenv-safest').config();

sendOTPTo({
  to: 'gabriellisboa.rx@gmail.com',
})
  .then((otp) => {
    console.log('OTP sent');

    verifyOTPFrom({
      from: 'gabriellisboa.rx@gmail.com',
      code: otp,
    })
      .then((response) => console.log('OTP verified'))
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
