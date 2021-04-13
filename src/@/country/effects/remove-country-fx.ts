import { createEffect } from 'effector';

import { getDefaultCountryOpacity } from '@/map/constants';
import { Map, StylePaintData } from '@/map/types';
import { clickSchool } from '@/popup/model';

export const removeCountryFx = createEffect(
  ({ map, paintData }: { map: Map | null; paintData: StylePaintData }) => {
    if (!map) return;

    map.off('click', 'selectedCountry', clickSchool);

    if (map.getLayer('selectedCountry')) {
      map.removeLayer('selectedCountry');
    }

    if (map.getSource('selectedCountry')) {
      map.removeSource('selectedCountry');
    }
    if (map.getLayer('countries')) {
      map.setPaintProperty(
        'countries',
        'fill-opacity',
        getDefaultCountryOpacity(paintData)
      );
    }
  }
);
