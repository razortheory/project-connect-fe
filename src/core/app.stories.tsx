import { Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';

import { App } from './App';

export default {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null,
    },
  },
} as Meta;

export const Map = create(App);
