import { Meta } from '@storybook/react';

import { ProjectPage } from './project-page';

export default {
  title: 'Pages/Project',
  component: ProjectPage,
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const main = ProjectPage;
