/** @type import('@typescript-eslint/types').ParserOptions */
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  project: './tsconfig.json',
  tsconfigRootDir: './',
};

/** @type import('eslint').Linter.Config */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions,
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        paths: ['src'],
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:unicorn/recommended',
    'prettier/unicorn',
    // 'plugin:jest/recommended', // Is plugin included?
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'webpack/**/*.ts',
          'src/**/*.test.js',
          'src/**/*.test.ts',
          './*.js',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
      'SequenceExpression',
    ],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        whitelist: {
          props: true,
          Props: true,
          outputDev: true,
          outputProd: true,
          env: true,
          envRef: true,
          'config.dev': true,
          'config.prod': true,
          presetEnv: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowedNames: ['View'],
      },
    ],
  },
};

module.exports = config;
