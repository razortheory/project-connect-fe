import { Meta } from '@storybook/react';
import React from 'react';

import { MapBrowser } from './map-browser';
import { MapCountries } from './map-countries';
import { MapCountry } from './map-country';
import { MapOverview } from './map-overview';

export default {
  title: 'Library/MapBrowser',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const empty = MapBrowser;

export const overview = () => (
  <MapBrowser>
    <MapOverview />
  </MapBrowser>
);

export const countries = () => (
  <MapBrowser>
    <MapCountries />
  </MapBrowser>
);

export const country = () => (
  <MapBrowser>
    <MapCountry />
  </MapBrowser>
);
