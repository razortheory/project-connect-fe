import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as paths from './paths';
import { isDevelopment } from './env';
import { postcssConfig } from './postcss';

export const rules: RuleSetRule[] = [
  // JS
  {
    test: paths.jsPattern,
    include: paths.source,
    use: ['babel-loader'],
  },
  // CSS
  {
    test: paths.cssPattern,
    use: [
      isDevelopment
        ? 'style-loader'
        : {
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
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          ...postcssConfig,
        },
      },
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true, // required for resolve-url-loader
          sassOptions: {
            sourceMapContents: false,
          },
          webpackImporter: false,
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
          ref: true,
          memo: true,
          babel: false,
          prettier: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
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
