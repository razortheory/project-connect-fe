import React from 'react';

import { AppFrame } from '~/core';
import { mapCountries, mapCountry, mapOverview } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { CountryInfo, CountryList, WorldView } from '@/map/@/sidebar';

import { MapTemplate } from './map-template';

export const MapPage = () => (
  <AppFrame>
    <MapTemplate>
      {useRoute(mapOverview) && <WorldView />}
      {useRoute(mapCountries) && <CountryList />}
      {useRoute(mapCountry) && <CountryInfo />}
    </MapTemplate>
  </AppFrame>
);
