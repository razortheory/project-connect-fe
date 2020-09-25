/* eslint-disable @typescript-eslint/no-var-requires */

process.env.NODE_ENV = 'test';
process.env.NODE_ICU_DATA = 'node_modules/full-icu';

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

// noinspection JSValidateJSDoc
/** @type import('@jest/types').Config.InitialOptions */
const config = {
  coverageDirectory: '.coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `${__dirname}/`,
  }),
};

module.exports = config;
