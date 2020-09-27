import { createEffect } from 'effector';

import { getSchoolsColors } from '@/map/@/country/helpers';
import { clickSchool } from '@/map/@/country/model';
import { UpdateSchools } from '@/map/@/country/types';

import { removeSchoolsFx } from './remove-schools-fx';

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
          'circle-color': getSchoolsColors(mapType),
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
