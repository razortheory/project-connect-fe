import { Meta } from '@storybook/react';
import React from 'react';

import { AppFrame } from '~/core';
import { MapCountries, MapCountry } from '~/features/sidebar';
import { MapOverview } from '~/ui/components';
import { MapTemplate } from '~/ui/templates';

export default {
  title: 'Pages/Map',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null,
    },
  },
} as Meta;

export const overview = () => (
  <AppFrame>
    <MapTemplate>
      <MapOverview />
    </MapTemplate>
  </AppFrame>
);

export const countries = () => (
  <AppFrame>
    <MapTemplate>
      <MapCountries />
    </MapTemplate>
  </AppFrame>
);

export const country = () => (
  <AppFrame>
    <MapTemplate>
      <MapCountry />
    </MapTemplate>
  </AppFrame>
);
