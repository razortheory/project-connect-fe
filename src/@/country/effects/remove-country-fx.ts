import { createEffect } from 'effector';

import { Map } from '@/map/types';

export const removeCountryFx = createEffect((map: Map) => {
  if (map.getLayer('selectedCountry')) {
    map.removeLayer('selectedCountry');
  }

  if (map.getSource('selectedCountry')) {
    map.removeSource('selectedCountry');
  }
});
