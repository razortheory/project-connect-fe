import { Meta } from '@storybook/react';

import { Map } from './map';

export default {
  title: 'Library/Map',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const primary = Map;
