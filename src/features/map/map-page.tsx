import React from 'react';

import { AppFrame } from '~/core';
import { mapCountries, mapCountry, mapOverview } from '~/core/routes';
import { useRoute } from '~/lib/router';
import { MapCountries, MapCountry, MapOverview } from '~/ui/components';
import { MapTemplate } from '~/ui/templates';

export const MapPage = () => (
  <AppFrame>
    <MapTemplate>
      {useRoute(mapOverview) && <MapOverview />}
      {useRoute(mapCountries) && <MapCountries />}
      {useRoute(mapCountry) && <MapCountry />}
    </MapTemplate>
  </AppFrame>
);
