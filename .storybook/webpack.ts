import { Configuration } from 'webpack';

import { resolvePlugins } from '../webpack/config.common';

import { css, svg, assets } from '../webpack/rules';

export const webpackConfig: Configuration = {
  resolve: {
    plugins: resolvePlugins,
  },
  module: {
    rules: [css, svg, assets],
  },
};
