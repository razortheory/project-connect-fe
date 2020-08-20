import { Meta } from '@storybook/react';

import { ProjectPage } from './project-page';

export default {
  title: 'Pages/Project',
  component: ProjectPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null,
    },
  },
} as Meta;

export const main = ProjectPage;
