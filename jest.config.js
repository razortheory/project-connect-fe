/* eslint-disable @typescript-eslint/no-var-requires */

// Set env vars from file
require('dotenv').config({ path: 'test.env' });

// Override system NODE_ENV
process.env.NODE_ENV = 'test';

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

// Transforms tsconfig.json paths to jest's moduleNameMapper
const tsModuleNameMap = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `${__dirname}/`,
});

// noinspection JSValidateJSDoc
/** @type import('@jest/types').Config.InitialOptions */
// noinspection JSValidateJSDoc
/** @type import('@jest/types').Config.InitialOptions */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  coverageDirectory: '.coverage',
  moduleNameMapper: {
    ...tsModuleNameMap,
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
  },
  setupFiles: ['<rootDir>/src/__mocks__/jest.stub.js'],
};

module.exports = config;
