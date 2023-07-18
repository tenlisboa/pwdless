# Pwdless

This is a library that intents to facilitate the Passwordless strategy to authenticate users.

**It's use is not recommended for production yet**

## Observations

Now the lib saves a cache for validating an OTP, currently in memmory, so, if your app goes down all the cache is gonna be cleansed.

This version is the minimal viable usable, and updates will come soon.

Feel free to contribute in [pwdless repository](https://github.com/tenlisboa/pwdless)

### Usage

Instalation

```
npm i pwdless
```

or

```
yarn add pwdless
```

A quick example:

```js
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
```

For now, the email configuration is loaded from env

```bash
EMAIL_HOST=""
EMAIL_PORT=""
EMAIL_USER=""
EMAIL_PASS=""
EMAIL_FROM="noreply@pwdless.io"
```
