import { Meta } from '@storybook/react';
import React from 'react';

import { CountryInfo } from './country-info';
import { CountryList } from './country-list';
import { MapBrowser } from './map-browser';
import { WorldInfo } from './world-info';

export default {
  title: 'Library/MapBrowser',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
      /*
      docsOnly: true,
      previewTabs: {
        canvas: {
          hidden: true,
        },
      },
      */
    },
  },
} as Meta;

export const empty = MapBrowser;

export const worldInfo = () => (
  <MapBrowser>
    <WorldInfo />
  </MapBrowser>
);

export const countryList = () => (
  <MapBrowser>
    <CountryList />
  </MapBrowser>
);

export const countryInfo = () => (
  <MapBrowser>
    <CountryInfo />
  </MapBrowser>
);
