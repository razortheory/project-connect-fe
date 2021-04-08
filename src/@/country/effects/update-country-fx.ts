import { createEffect } from 'effector';
import { PointLike } from 'mapbox-gl';

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

    map.on('click', 'selectedCountry', (event) => {
      const bbox: [PointLike, PointLike] = [
        [event.point.x - 10, event.point.y - 10],
        [event.point.x + 10, event.point.y + 10],
      ];

      const features = map.queryRenderedFeatures(bbox, {
        layers: ['schools'],
      });

      if (!features?.length) {
        return;
      }

      clickSchool(features[0]);
    });

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
