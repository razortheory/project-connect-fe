import React from 'react';

import { AppFrame } from '~/core';
import { mapCountries, mapCountry, mapOverview } from '~/core/routes';
import { MapCountries, MapCountry } from '~/features/sidebar';
import { useRoute } from '~/lib/router';
import { MapOverview } from '~/ui/components';
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
