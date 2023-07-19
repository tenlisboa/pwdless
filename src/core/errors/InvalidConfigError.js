class InvalidConfigError extends Error {
  name = 'InvalidConfigError';

  constructor(message) {
    super(message);
  }
}

module.exports = InvalidConfigError;
