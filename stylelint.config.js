/** @type Partial<import('stylelint').Configuration> */
const config = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
};

module.exports = config;
