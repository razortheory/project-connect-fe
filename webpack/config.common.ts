import webpack, { Plugin, ResolvePlugin } from 'webpack';
import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import './types';
import { nodeLibsBrowser } from './node';
import * as paths from './paths';

// Common plugins
export const commonPlugins: Plugin[] = [
  new DotenvWebpackPlugin({
    path: paths.env,
    safe: paths.envRef,
    expand: true,
  }),
  new HtmlWebpackPlugin({
    inject: 'body',
    template: paths.indexHtml,
    favicon: paths.favicon,
  }),
];

export const resolvePlugins: ResolvePlugin[] = [
  // Get aliases from tsconfig.json
  new TsconfigPathsPlugin(),
];

// Common config
export const commonConfig: webpack.Configuration = {
  context: paths.root,
  resolve: {
    extensions: paths.extensions,
    plugins: resolvePlugins,
  },
  output: {
    path: paths.build,
  },
  module: {
    rules: [],
    wrappedContextCritical: true,
    strictExportPresence: true,
  },
  plugins: commonPlugins,
  performance: {
    hints: false,
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true, // better gzipped
    namedChunks: true,
  },
  stats: {
    modules: false,
    chunks: false,
    children: false,
    timings: false,
    version: false,
  },
  node: nodeLibsBrowser,
};

// eslint-disable-next-line import/no-default-export
export default commonConfig;
