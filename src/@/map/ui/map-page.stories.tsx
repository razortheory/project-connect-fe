import { Meta } from '@storybook/react';
import React from 'react';

import { AppFrame } from '~/core';

import { CountryInfo, CountryList, WorldView } from '@/map/@/sidebar';

import { MapTemplate } from './map-template';

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
    <MapTemplate>
      <WorldView />
    </MapTemplate>
  </AppFrame>
);

export const countries = () => (
  <AppFrame>
    <MapTemplate>
      <CountryList />
    </MapTemplate>
  </AppFrame>
);

export const country = () => (
  <AppFrame>
    <MapTemplate>
      <CountryInfo />
    </MapTemplate>
  </AppFrame>
);
