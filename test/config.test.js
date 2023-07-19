const { expect, describe, test, beforeEach } = require('@jest/globals');
const Config = require('../src/lib/config');

const goodConfig = require('../test/mocks/config');
const InvalidConfigError = require('../src/core/errors/InvalidConfigError');

describe('config test', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should implement a setup method to configure the module', () => {
    expect(Config.setup).toBeDefined();
    expect(typeof Config.setup).toBe('function');
  });

  test('should implement a getConfig function', () => {
    expect(Config.config).toBeDefined();
  });

  test('should setup the config object', () => {
    const expected = goodConfig;

    Config.setup(expected);

    expect(Config.config).toEqual(expected);
  });

  test('should validate if the mailer config is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        mailer: 'invalid',
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the host property in mailer object is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          host: 123,
        },
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the port property in mailer object is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          host: 'smtp.gmail.com',
          port: 'invalid',
        },
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the auth property in mailer object is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          auth: 'invalid',
        },
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the otp config is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        otp: 'invalid',
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the length property in otp config is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        otp: {
          ...goodConfig.otp,
          length: 'invalid',
        },
      });
    }).toThrow(InvalidConfigError);
  });

  test('should validate if the ttl property in otp config is valid', () => {
    expect(() => {
      Config.setup({
        ...goodConfig,
        otp: {
          ...goodConfig.otp,
          ttl: 'invalid',
        },
      });
    }).toThrow(InvalidConfigError);
  });

  test('should return to default config if setup is called without arguments', () => {
    const expected = goodConfig;

    Config.setup(expected);

    expect(Config.config).toEqual(expected);

    Config.setup();

    expect(Config.config).not.toEqual(expected);
  });

  test('should return into config object only the allowed keys', () => {
    const expected = goodConfig;

    Config.setup(expected);

    expect(Config.config).toEqual(expected);

    Config.setup({
      ...expected,
      invalidKey: 'invalidValue',
    });

    expect(Config.config).toEqual(expected);
  });
});
