/* eslint-disable @typescript-eslint/no-var-requires */
const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  testRegex: '.e2e-spec.ts$',
  rootDir: '../test/e2e',
  setupFilesAfterEnv: ['../../jest/jest.setup.ts'],
};
