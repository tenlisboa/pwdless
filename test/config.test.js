const { expect, describe, test, beforeEach } = require('@jest/globals');

const goodConfig = require('../test/mocks/config');

describe('config test', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should implement a setup method to configure the module', () => {
    const { setup } = require('../src/lib/config');

    expect(setup).toBeDefined();
    expect(typeof setup).toBe('function');
  });

  test('should implement a getConfig function', () => {
    const { getConfig } = require('../src/lib/config');

    expect(getConfig).toBeDefined();
    expect(typeof getConfig).toBe('function');
  });

  test('should setup the config object', () => {
    const { setup, getConfig } = require('../src/lib/config');

    const expected = goodConfig;

    setup(expected);

    expect(getConfig()).toEqual(expected);
  });

  test('should validate if the mailer config is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        mailer: 'invalid',
      });
    }).toThrowError('Invalid mailer config');
  });

  test('should validate if the host property in mailer object is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          host: 123,
        },
      });
    }).toThrowError('Invalid mailer config');
  });

  test('should validate if the port property in mailer object is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          host: 'smtp.gmail.com',
          port: 'invalid',
        },
      });
    }).toThrowError('Invalid mailer config');
  });

  test('should validate if the auth property in mailer object is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        mailer: {
          ...goodConfig.mailer,
          auth: 'invalid',
        },
      });
    }).toThrowError('Invalid mailer config');
  });

  test('should validate if the otp config is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        otp: 'invalid',
      });
    }).toThrowError('Invalid otp config');
  });

  test('should validate if the length property in otp config is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        otp: {
          ...goodConfig.otp,
          length: 'invalid',
        },
      });
    }).toThrowError('Invalid otp config');
  });

  test('should validate if the ttl property in otp config is valid', () => {
    const { setup } = require('../src/lib/config');

    expect(() => {
      setup({
        ...goodConfig,
        otp: {
          ...goodConfig.otp,
          ttl: 'invalid',
        },
      });
    }).toThrowError('Invalid otp config');
  });

  test('should return to default config if setup is called without arguments', () => {
    const { setup, getConfig } = require('../src/lib/config');

    const expected = goodConfig;

    setup(expected);

    expect(getConfig()).toEqual(expected);

    setup();

    expect(getConfig()).not.toEqual(expected);
  });

  test('should return into config object only the allowed keys', () => {
    const { setup, getConfig } = require('../src/lib/config');

    const expected = goodConfig;

    setup(expected);

    expect(getConfig()).toEqual(expected);

    setup({
      ...expected,
      invalidKey: 'invalidValue',
    });

    expect(getConfig()).toEqual(expected);
  });
});
