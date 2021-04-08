import { createEffect } from 'effector';

// eslint-disable-next-line no-restricted-imports
import { addCountriesLayer } from '@/country/effects/add-countries-layer';
import { AddCountries } from '@/country/types';

export const addCountriesFx = createEffect(
  ({ map, paintData, countriesGeoJson, countryCode }: AddCountries) => {
    if (!map || !countriesGeoJson) return;

    map.addSource('countries', {
      type: 'geojson',
      data: countriesGeoJson,
    });

    if (!countryCode) {
      addCountriesLayer({ map, paintData });
    }
  }
);
