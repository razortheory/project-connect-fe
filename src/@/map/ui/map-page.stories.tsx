import { Meta } from '@storybook/react';
import React from 'react';

import { AppFrame } from '~/core';

import { MapPage } from './map-page';

export default {
  title: 'Pages/Map',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const overview = () => (
  <AppFrame>
    <MapPage />
  </AppFrame>
);
