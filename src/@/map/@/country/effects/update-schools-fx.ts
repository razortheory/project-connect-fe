import { createEffect } from 'effector';

import { clickSchool } from '@/map/@/country/model';
import { UpdateSchools } from '@/map/@/country/types';

import { getSchoolsColors } from './get-schools-colors';
import { removeSchoolsFx } from './remove-schools-fx';

export const updateSchoolsFx = createEffect(
  async ({ map, schools, mapType }: UpdateSchools) => {
    if (!map || !schools) return;

    await removeSchoolsFx(map);

    if (schools.features.length > 0) {
      map.addSource('schools', {
        type: 'geojson',
        data: schools,
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
