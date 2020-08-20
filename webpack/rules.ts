import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';

import { isDevelopment } from './env';
import * as paths from './paths';
import { postcssConfig } from './postcss';

export const js = {
  test: paths.jsPattern,
  include: paths.source,
  use: ['babel-loader'],
};

export const css = {
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
};

export const svg = {
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
};

export const assets = {
  test: paths.filePattern,
  use: {
    loader: 'file-loader',
    options: {
      context: paths.source,
      name: isDevelopment ? paths.outputDev.assets : paths.outputProd.assets,
    },
  },
};

export const rules: RuleSetRule[] = [js, css, svg, assets];
