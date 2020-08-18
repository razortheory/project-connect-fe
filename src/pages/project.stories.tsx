import { Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';

import { ProjectPage } from './ProjectPage';

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

export const Project = create(ProjectPage);
