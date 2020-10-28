import { createEffect } from 'effector';

import { UpdateCountry } from '@/country/types';
import { getDefaultCountryOpacity } from '@/map/constants';

export const updateCountryFx = createEffect(
  ({ map, paintData, country }: UpdateCountry) => {
    if (!country || !map) return;

    map.addSource('selectedCountry', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: country.geometry,
        properties: {},
      },
    });

    map.addLayer(
      {
        id: 'selectedCountry',
        type: 'fill',
        source: 'selectedCountry',
        paint: {
          'fill-color': paintData.countrySelected,
          'fill-opacity': paintData.opacity,
          'fill-outline-color': paintData.background,
        },
      },

      // Country layer always below schools layer
      map.getLayer('schools') ? 'schools' : ''
    );
    if (map.getLayer('countries')) {
      map.setPaintProperty('countries', 'fill-opacity', [
        'case',
        ['==', ['id'], country.id],
        0,
        getDefaultCountryOpacity(paintData),
      ]);
      map.setPaintProperty('countries', 'fill-outline-color', [
        'case',
        ['==', ['id'], country.id],
        paintData.countryNotSelected,
        paintData.background,
      ]);
    }
  }
);
