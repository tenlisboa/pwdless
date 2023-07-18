module.exports = Object.freeze({
  mailer: {
    host: 'smtp.gmail.com',
    port: '465',
    auth: {
      user: 'someemail@gmail.com',
      pass: 'somepwd',
    },
  },
  otp: {
    length: 6,
    ttl: 2,
  },
});
