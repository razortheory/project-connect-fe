import { Meta } from '@storybook/react';
import React from 'react';

import { Layout } from '~/ui';

import { Footer } from './footer';

export default {
  title: 'Library/Footer',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const primary = () => (
  <Layout>
    <Footer />
  </Layout>
);
