import { createEffect } from 'effector';
import { Expression, StyleFunction } from 'mapbox-gl';

import { clickSchool } from '@/map/@/country/model';
import { UpdateSchools } from '@/map/@/country/types';
import {
  connectivityStatusPaintData,
  coverageStatusPaintData,
} from '@/map/constants';
import { MapTypes } from '@/map/types';

import { removeSchoolsFx } from './remove-schools-fx';

export const getSchoolsCircleColor = (
  mapType: MapTypes
): string | StyleFunction | Expression | undefined => {
  if (mapType === 'connectivity') {
    return [
      'match',
      ['get', 'connectivity_status'],
      'no',
      connectivityStatusPaintData.no,
      'unknown',
      connectivityStatusPaintData.unknown,
      'moderate',
      connectivityStatusPaintData.moderate,
      'good',
      connectivityStatusPaintData.good,
      connectivityStatusPaintData.unknown,
    ];
  }
  if (mapType === 'coverage') {
    return [
      'match',
      ['get', 'coverage_status'],
      'known',
      coverageStatusPaintData.known,
      'unknown',
      coverageStatusPaintData.unknown,
      coverageStatusPaintData.unknown,
    ];
  }
  return '#ffffff';
};

export const updateSchoolsFx = createEffect(
  async ({ map, countrySchools, mapType }: UpdateSchools) => {
    if (!map || !countrySchools) return;

    await removeSchoolsFx(map);

    if (countrySchools.features.length > 0) {
      map.addSource('schools', {
        type: 'geojson',
        data: countrySchools,
      });

      map.addLayer({
        id: 'schools',
        type: 'circle',
        source: 'schools',
        paint: {
          'circle-radius': {
            base: 1.5,
            stops: [
              [12, 1.5],
              [21, 10],
            ],
          },
          'circle-color': getSchoolsCircleColor(mapType),
        },
      });

      map.on('mouseenter', 'schools', () => {
        // eslint-disable-next-line no-param-reassign
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'schools', () => {
        // eslint-disable-next-line no-param-reassign
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'schools', clickSchool);
    }
  }
);
