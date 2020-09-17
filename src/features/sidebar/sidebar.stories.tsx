import { Meta } from '@storybook/react';
import React from 'react';

import { MapOverview } from '~/ui/components/map-overview';

import { MapCountries } from './map-countries';
import { MapCountry } from './map-country';
import { Sidebar } from './sidebar';

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

export const empty = Sidebar;

export const overview = () => (
  <Sidebar>
    <MapOverview />
  </Sidebar>
);

export const countries = () => (
  <Sidebar>
    <MapCountries />
  </Sidebar>
);

export const country = () => (
  <Sidebar>
    <MapCountry />
  </Sidebar>
);
