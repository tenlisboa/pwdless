const _defaultConfig = {
  mailer: {
    host: '',
    port: '',
    auth: {
      user: '',
      pass: '',
    },
  },
  otp: {
    length: 6,
    ttl: 2,
  },
};

let config = _defaultConfig;

function setup(inputConfig = _defaultConfig) {
  const validatedConfig = _validateConfig(inputConfig);

  config = validatedConfig;
}

function _validateConfig(config) {
  _validateMailerConfig(config.mailer);
  _validateOTPConfig(config.otp);

  return {
    mailer: config.mailer,
    otp: config.otp,
  };
}

function _validateMailerConfig(mailer) {
  let hasError = false;
  if (typeof mailer !== 'object') {
    hasError = true;
  }

  if (typeof mailer.host !== 'string') {
    hasError = true;
  }

  if (Number.isNaN(Number(mailer.port))) {
    hasError = true;
  }

  if (typeof mailer.auth !== 'object') {
    hasError = true;
  }

  if (hasError) {
    throw new Error('Invalid mailer config');
  }
}

function _validateOTPConfig(otp) {
  let hasError = false;
  if (typeof otp !== 'object') {
    hasError = true;
  }

  if (Number.isNaN(Number(otp.length))) {
    hasError = true;
  }

  if (Number.isNaN(Number(otp.ttl))) {
    hasError = true;
  }

  if (hasError) {
    throw new Error('Invalid otp config');
  }
}

function getConfig() {
  return config;
}

module.exports = {
  setup,
  getConfig,
};
