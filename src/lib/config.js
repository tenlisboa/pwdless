const InvalidConfigError = require('../core/errors/InvalidConfigError');
const Cache = require('../core/database');

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

class Config {
  #config = _defaultConfig;
  #cache;
  static #instance;

  constructor(cache = Cache) {
    this.#cache = cache;
  }

  static #getInstance() {
    if (!this.#instance) {
      this.#instance = new Config();
    }

    return this.#instance;
  }

  static get config() {
    const instance = this.#getInstance();
    return instance.#config;
  }

  static setup(inputConfig = _defaultConfig) {
    const instance = this.#getInstance();
    const validatedConfig = instance.#validateConfig(inputConfig);

    instance.#config = validatedConfig;
  }

  #validateConfig(config) {
    this.#validateMailerConfig(config.mailer);
    this.#validateOTPConfig(config.otp);

    return {
      mailer: config.mailer,
      otp: config.otp,
    };
  }

  #validateMailerConfig(mailer) {
    let hasError = false;
    const messages = [];

    if (typeof mailer !== 'object') {
      hasError = true;
      messages.push('Mailer config must be an object');
    }

    if (typeof mailer.host !== 'string') {
      hasError = true;
      messages.push('Mailer host must be a string');
    }

    if (Number.isNaN(Number(mailer.port))) {
      hasError = true;
      messages.push('Mailer port must be a number');
    }

    if (typeof mailer.auth !== 'object') {
      hasError = true;
      messages.push('Mailer auth must be an object');
    }

    if (hasError) {
      throw new InvalidConfigError(messages.join(', '));
    }
  }

  #validateOTPConfig(otp) {
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
      throw new InvalidConfigError('Invalid otp config');
    }
  }
}

module.exports = Config;
