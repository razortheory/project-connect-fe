import { merge } from 'webpack-merge';
import { StorybookConfig } from '@storybook/core/types';

import { webpackConfig } from './webpack';

export const storybookConfig: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    // Remove css, file and url loaders
    config.module!.rules = config.module?.rules?.slice(0, -3)!;
    // Merge with custom config
    return merge(config, webpackConfig);
  },
};

export default storybookConfig;
