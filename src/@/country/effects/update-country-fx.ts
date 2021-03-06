import { createEffect } from 'effector';

import { clickSchool } from '@/country/model';
import { UpdateCountry } from '@/country/types';

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
          'fill-opacity': paintData.selectedCountryOpacity,
          'fill-outline-color': paintData.background,
        },
      },
      // Country layer always below schools layer
      map.getLayer('schools') ? 'schools' : ''
    );

    map.on('click', 'selectedCountry', clickSchool);

    if (map.getLayer('countries')) {
      map.removeLayer('countries');
    }
    if (map.getLayer('boundaries')) {
      map.removeLayer('boundaries');
    }
    if (map.getLayer('schoolsGlobal')) {
      map.removeLayer('schoolsGlobal');
    }
  }
);
