import { createEffect } from 'effector';

import { UpdateCountry } from '@/map/@/country/types';

import { removeCountryFx } from './remove-country-fx';

export const updateCountryFx = createEffect(
  async ({ map, paintData, countryData }: UpdateCountry) => {
    if (!countryData || !map) return;

    await removeCountryFx(map);

    map.addSource('selectedCountry', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: countryData.geometry,
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

    map.setPaintProperty(
      'countries',
      'fill-color',
      paintData.countryNotSelected
    );

    map.setPaintProperty('countries', 'fill-outline-color', [
      'case',
      ['==', ['id'], countryData.id],
      paintData.countryNotSelected,
      paintData.background,
    ]);
  }
);
