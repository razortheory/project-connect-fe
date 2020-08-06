/** @type Partial<import('stylelint').Configuration> */
const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
};

module.exports = config;
