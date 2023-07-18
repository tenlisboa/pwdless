const db = require('../core/database');
const crypto = require('crypto');

async function verifyOTPFrom({ from, code }) {
  const emailHash = crypto.createHash('md5').update(from).digest('hex');

  const cache = await db.get(emailHash);

  if (!cache) {
    throw new Error('OTP not found');
  }

  if (cache.otp !== code) {
    throw new Error('Invalid OTP');
  }

  if (cache.expiresAt < Date.now()) {
    throw new Error('OTP expired');
  }

  return true;
}

module.exports = verifyOTPFrom;
