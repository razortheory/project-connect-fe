import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as paths from './paths';
import { isDevelopment } from './env';
import { postcssConfig } from './postcss';

export const rules: RuleSetRule[] = [
  // JS
  {
    test: paths.babelPattern,
    include: paths.source,
    use: ['babel-loader'],
  },
  // CSS
  {
    test: paths.stylePattern,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
          hmr: isDevelopment,
        },
      },
      {
        loader: 'css-loader',
        options: {
          esModule: true,
          sourceMap: isDevelopment,
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          ...postcssConfig,
        },
      },
    ],
  },
  // SVG
  {
    test: paths.svgPattern,
    use: [
      'babel-loader',
      {
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          ref: true,
          memo: true,
          babel: false,
        },
      },
    ],
  },
  // Other files
  {
    test: paths.filePattern,
    use: {
      loader: 'file-loader',
      options: {
        context: paths.source,
        name: isDevelopment ? paths.outputDev.assets : paths.outputProd.assets,
      },
    },
  },
];
