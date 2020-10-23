import { Meta } from '@storybook/react';

import { Sidebar } from './sidebar';

export default {
  title: 'Library/Sidebar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const sidebar = Sidebar;
