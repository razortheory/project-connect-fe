import webpack, { Plugin } from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as paths from './paths';
import { commonConfig } from './config.common';
import { rules } from './rules';

// Development plugins
const developmentPlugins: Plugin[] = [
  new MiniCssExtractPlugin({
    filename: paths.outputDev.css,
    chunkFilename: paths.outputDev.cssChunks,
  }),
  new webpack.HotModuleReplacementPlugin(),
];

// Development config
export const developmentConfig = merge(commonConfig, {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', paths.entryMain],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    publicPath: '/',
    pathinfo: true,
    filename: paths.outputDev.js,
    chunkFilename: paths.outputDev.jsChunks,
  },
  module: {
    rules,
  },
  plugins: developmentPlugins,
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: paths.build,
    publicPath: '/',
    open: true,
    compress: true,
    clientLogLevel: 'error',
    historyApiFallback: {
      disableDotRule: true,
    },
    host: 'localhost',
    port: 8000,
  },
  optimization: {
    concatenateModules: false,
    minimize: false,
    runtimeChunk: true,
  },
  stats: {
    performance: false,
    assets: false,
    entrypoints: false,
  },
});

// eslint-disable-next-line import/no-default-export
export default developmentConfig;
