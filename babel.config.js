const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.WEBPACK_DEV_SERVER === 'true';

/** @type import('@babel/preset-env').Options */
// eslint-disable-next-line unicorn/prevent-abbreviations
const babelPresetEnv = {
  loose: true,
  useBuiltIns: 'usage',
  corejs: 3,
  modules: isTest ? 'commonjs' : false,
  shippedProposals: true,
  bugfixes: true, // remove later in babel 8
};

const babelPresetTypescript = {
  isTSX: true,
  allExtensions: true,
};

module.exports = {
  presets: [
    ['@babel/preset-react', { useBuiltIns: true }],
    ['@babel/preset-env', babelPresetEnv],
    ['@babel/preset-typescript', babelPresetTypescript],
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: isDevelopment,
        pure: true,
      },
    ],
  ],
};
