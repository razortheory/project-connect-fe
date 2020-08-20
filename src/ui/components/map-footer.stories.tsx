import { Meta } from '@storybook/react';
import React from 'react';

import { Layout } from './layout';
import { MapFooter } from './map-footer';

export default {
  title: 'Library/MapFooter',
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
    <MapFooter />
  </Layout>
);
