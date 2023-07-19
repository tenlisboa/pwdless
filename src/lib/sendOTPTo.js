const db = require('../core/database');
const setupEmailSenderWorker = require('../core/sender-worker');
const crypto = require('crypto');
const Config = require('./config');

async function sendOTPTo({ to }) {
  const otpConfig = Config.config.otp;

  const otp = Math.floor(
    10 ** (otpConfig.length - 1) +
      Math.random() * 9 * 10 ** (otpConfig.length - 1)
  );

  await db.set(crypto.createHash('md5').update(to).digest('hex'), {
    otp,
    expiresAt: Date.now() + 1000 * 60 * 2, // 2 minutes
  });

  await setupEmailSenderWorker({
    from: 'noreply@pwdless.io',
    to,
    text: `Your OTP code is ${otp}`,
  });

  return otp;
}

module.exports = sendOTPTo;
