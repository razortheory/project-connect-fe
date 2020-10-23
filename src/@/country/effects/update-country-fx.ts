import { createEffect } from 'effector';

import { UpdateCountry } from '@/country/types';

import { removeCountryFx } from './remove-country-fx';

export const updateCountryFx = createEffect(
  async ({ map, paintData, country }: UpdateCountry) => {
    if (!country || !map) return;

    await removeCountryFx(map);

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
      map.setPaintProperty(
        'countries',
        'fill-color',
        paintData.countryNotSelected
      );
      map.setPaintProperty('countries', 'fill-outline-color', [
        'case',
        ['==', ['id'], country.id],
        paintData.countryNotSelected,
        paintData.background,
      ]);
    }
  }
);
